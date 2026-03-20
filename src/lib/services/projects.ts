import { db, storage } from "../firebase";
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
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { Project } from "@/types/project";

const COLLECTION_NAME = "projects";

const convertDate = (docData: any) => {
    return {
        ...docData,
        dateCreated: docData.dateCreated instanceof Timestamp
            ? docData.dateCreated.toDate()
            : new Date(docData.dateCreated)
    };
};

export const getProjects = async (category?: string): Promise<Project[]> => {
    const projectsRef = collection(db, COLLECTION_NAME);
    let q = query(projectsRef, orderBy("dateCreated", "desc"));

    if (category) {
        q = query(projectsRef, where("category", "==", category), orderBy("dateCreated", "desc"));
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...convertDate(doc.data())
    })) as Project[];
};

export const getProjectById = async (id: string): Promise<Project | null> => {
    const docRef = doc(db, COLLECTION_NAME, id);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
        return {
            id: snapshot.id,
            ...convertDate(snapshot.data())
        } as Project;
    }
    return null;
};

export const createProject = async (
    project: Omit<Project, "id" | "dateCreated">,
    imageFile?: File
): Promise<string> => {
    let imageUrl = project.imageUrl || "";

    if (imageFile) {
        const storageRef = ref(storage, `projects/${Date.now()}_${imageFile.name}`);
        const snapshot = await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(snapshot.ref);
    }

    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...project,
        imageUrl,
        dateCreated: new Date(),
    });
    return docRef.id;
};

export const updateProject = async (
    id: string,
    project: Partial<Omit<Project, "id" | "dateCreated">>,
    imageFile?: File
): Promise<void> => {
    let imageUrl = project.imageUrl;

    if (imageFile) {
        const storageRef = ref(storage, `projects/${Date.now()}_${imageFile.name}`);
        const snapshot = await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(snapshot.ref);
    }

    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, { ...project, ...(imageUrl !== undefined && { imageUrl }) });
};

export const deleteProject = async (id: string): Promise<void> => {
    const project = await getProjectById(id);
    if (project?.imageUrl) {
        try {
            const imageRef = ref(storage, project.imageUrl);
            await deleteObject(imageRef);
        } catch {
            // Image may not exist in storage — continue with deletion
        }
    }
    await deleteDoc(doc(db, COLLECTION_NAME, id));
};
