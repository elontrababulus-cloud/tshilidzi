import { db } from "../firebase";
import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    getDocs,
    getDoc,
    query,
    orderBy,
    where,
    Timestamp
} from "firebase/firestore";
import { NewsArticle } from "@/types/news";

const COLLECTION_NAME = "news";

// Helper to convert Firestore timestamp to JS Date
const convertDate = (docData: any) => {
    return {
        ...docData,
        publishedAt: docData.publishedAt instanceof Timestamp
            ? docData.publishedAt.toDate()
            : new Date(docData.publishedAt)
    };
};

export const getNewsArticles = async (onlyPublished = false): Promise<NewsArticle[]> => {
    const newsRef = collection(db, COLLECTION_NAME);
    let q = query(newsRef, orderBy("publishedAt", "desc"));

    if (onlyPublished) {
        q = query(newsRef, where("status", "==", "published"), orderBy("publishedAt", "desc"));
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...convertDate(doc.data())
    })) as NewsArticle[];
};

export const getNewsArticleById = async (id: string): Promise<NewsArticle | null> => {
    const docRef = doc(db, COLLECTION_NAME, id);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
        return {
            id: snapshot.id,
            ...convertDate(snapshot.data())
        } as NewsArticle;
    }
    return null;
};

export const createNewsArticle = async (article: Omit<NewsArticle, "id">): Promise<string> => {
    // Ensure publishedAt is a Date object or Timestamp
    const payload = {
        ...article,
        publishedAt: article.publishedAt ? new Date(article.publishedAt) : new Date()
    };
    const docRef = await addDoc(collection(db, COLLECTION_NAME), payload);
    return docRef.id;
};

export const updateNewsArticle = async (id: string, article: Partial<NewsArticle>): Promise<void> => {
    const docRef = doc(db, COLLECTION_NAME, id);
    const payload = { ...article };
    if (payload.publishedAt) {
        payload.publishedAt = new Date(payload.publishedAt);
    }
    await updateDoc(docRef, payload);
};

export const deleteNewsArticle = async (id: string): Promise<void> => {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
};
