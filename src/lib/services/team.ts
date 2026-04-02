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
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { TeamMember } from "@/types/team";

const COLLECTION_NAME = "team";

export const getTeamMembers = async (): Promise<TeamMember[]> => {
    const q = query(collection(db, COLLECTION_NAME), orderBy("order", "asc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() })) as TeamMember[];
};

export const getTeamMemberById = async (id: string): Promise<TeamMember | null> => {
    const snapshot = await getDoc(doc(db, COLLECTION_NAME, id));
    if (snapshot.exists()) return { id: snapshot.id, ...snapshot.data() } as TeamMember;
    return null;
};

export const createTeamMember = async (
    member: Omit<TeamMember, "id">,
    photoFile?: File
): Promise<string> => {
    let photoUrl = member.photoUrl || "";
    if (photoFile) {
        const storageRef = ref(storage, `team/${Date.now()}_${photoFile.name}`);
        const snap = await uploadBytes(storageRef, photoFile);
        photoUrl = await getDownloadURL(snap.ref);
    }
    const docRef = await addDoc(collection(db, COLLECTION_NAME), { ...member, photoUrl });
    return docRef.id;
};

export const updateTeamMember = async (
    id: string,
    member: Partial<Omit<TeamMember, "id">>,
    photoFile?: File
): Promise<void> => {
    let photoUrl = member.photoUrl;
    if (photoFile) {
        const storageRef = ref(storage, `team/${Date.now()}_${photoFile.name}`);
        const snap = await uploadBytes(storageRef, photoFile);
        photoUrl = await getDownloadURL(snap.ref);
    }
    await updateDoc(doc(db, COLLECTION_NAME, id), { ...member, ...(photoUrl !== undefined && { photoUrl }) });
};

export const deleteTeamMember = async (id: string): Promise<void> => {
    const member = await getTeamMemberById(id);
    if (member?.photoUrl) {
        try {
            await deleteObject(ref(storage, member.photoUrl));
        } catch {
            // photo may not exist in storage
        }
    }
    await deleteDoc(doc(db, COLLECTION_NAME, id));
};
