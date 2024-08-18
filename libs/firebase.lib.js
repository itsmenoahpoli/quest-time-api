const firebaseConfig = {
  apiKey: "AIzaSyCoU5URrWPohvXh_0hvGTtLHUT5_7WLjsQ",
  authDomain: "quest-time-93837.firebaseapp.com",
  projectId: "quest-time-93837",
  storageBucket: "quest-time-93837.appspot.com",
  messagingSenderId: "221743090680",
  appId: "1:221743090680:web:b6d440378147206bdc640d",
};

const { initializeApp } = require("firebase/app");
const { getFirestore, collection, doc, query, where, addDoc, getDocs, getDoc, updateDoc, deleteDoc } = require("firebase/firestore");

export const firebaseApp = initializeApp(firebaseConfig);

export const FirebaseService = {
  db: getFirestore(firebaseApp),

  async getDocuments(collectionName) {
    const docsSnap = await getDocs(collection(this.db, collectionName));

    return docsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  },

  async createDocument(collectionName, data) {
    const docRef = await addDoc(collection(this.db, collectionName), data);
    return {
      id: docRef.id,
      ...data,
    };
  },

  async getDocumentById(collectionName, documentId) {
    const docRef = doc(this.db, collectionName, documentId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      };
    } else {
      return null;
    }
  },

  async getDocumentByField(collectionName, fieldName, fieldValue) {
    const colRef = collection(this.db, collectionName);
    const querySnapshot = await getDocs(query(colRef, where(fieldName, "==", fieldValue)));

    if (!querySnapshot.empty) {
      const docSnap = querySnapshot.docs[0];
      return {
        id: docSnap.id,
        ...docSnap.data(),
      };
    } else {
      return null;
    }
  },

  async updateDocumentById(collectionName, documentId, data) {
    const docRef = doc(this.db, collectionName, documentId);
    await updateDoc(docRef, data);

    return {
      id: documentId,
      ...data,
    };
  },

  async deleteDocumentById(collectionName, documentId) {
    const docRef = doc(this.db, collectionName, documentId);
    await deleteDoc(docRef);

    return {
      id: documentId,
    };
  },
};
