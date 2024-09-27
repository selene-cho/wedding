import {
  collection,
  doc,
  query,
  orderBy,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '@/firebase.js';

export async function getComments() {
  try {
    const commentList = [];

    const q = query(
      collection(db, 'GuestBook'),
      orderBy('createdDate', 'desc'),
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      commentList.push({ id: doc.id, ...doc.data() });
    });

    return commentList;
  } catch (error) {
    console.log('error:', error);
  }
}

export async function postComment(comments) {
  try {
    const docRef = await addDoc(collection(db, 'GuestBook'), {
      name: comments.name,
      password: comments.password,
      content: comments.content,
      createdDate: new Date(),
    });

    return docRef;
  } catch (error) {
    console.log('error:', error);
  }
}

export async function updateComment(updatedComment) {
  try {
    const docRef = doc(db, 'GuestBook', updatedComment.id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return new Error('존재하지 않는 게시물입니다.');
    }

    if (docSnap.data().password !== updatedComment.password) {
      return new Error('잘못된 비밀번호입니다.');
    }

    await setDoc(doc(db, 'GuestBook', updatedComment.id), {
      name: updatedComment.name,
      password: updatedComment.password,
      content: updatedComment.content,
      createdDate: updatedComment.createdDate,
      updatedDate: new Date(),
    });
  } catch (error) {
    console.log('error:', error);
  }
}

export async function deleteComment(id, password) {
  try {
    const docRef = doc(db, 'GuestBook', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return new Error('존재하지 않는 게시물입니다.');
    }

    if (docSnap.data().password !== password) {
      return new Error('잘못된 비밀번호입니다.');
    }

    await deleteDoc(docRef);
  } catch (error) {
    console.log('error:', error);
  }
}
