import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getFirestore ,collection, getDoc,doc,setDoc,updateDoc, arrayUnion,getDocs } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";

const firebaseConfig = {
apiKey: "AIzaSyCp4dNeP3v6D2T_JgLYxVftrLRvicjiMCg",
authDomain: "nec-porject.firebaseapp.com",
projectId: "nec-porject",
storageBucket: "nec-porject.appspot.com",
messagingSenderId: "287211043355",
appId: "1:287211043355:web:368e759250ec976ac696be"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)


export { db, collection , getDoc, doc,setDoc,updateDoc, arrayUnion,getDocs };

