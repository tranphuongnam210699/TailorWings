import { database } from "../firebase";
import { storage } from "../firebase";
import firebase from "firebase/app";
import { message } from "antd";
import { connect } from "react-redux";
import * as actions from "../actions/index";
import { useDispatch } from "react-redux";
import store from "../stores/myStore";

const _store = store;

export const getAllData = (collection) => {
    return database
        .collection(collection)
        .get()
        .then((querySnapshot) => {
            let result = [];
            querySnapshot.forEach((doc) => {
                let data = doc.data();
                data.id = doc.id;
                result.push(data);
            });
            return result;
        });
};

export const getAllDataRealtime = (collection, callback) => {
    database.collection(collection).onSnapshot((querySnapshot) => {
        let result = [];
        querySnapshot.forEach((doc) => {
            let data = doc.data();
            data.id = doc.id;
            result.push(data);
        });
        //note: this will be duplicated when called by multiple components
        // _store.dispatch(
        //     actions.getDatabaseUpdate(collection, result)
        // );
        callback(result);
    });
};

export const getAllDataTest = (collection, callback) => {
    // const dispatch = useDispatch();
    database.collection(collection).onSnapshot((querySnapshot) => {
        let result = [];
        querySnapshot.forEach((doc) => {
            let data = doc.data();
            data.id = doc.id;
            result.push(data);
        });
        //note: this will be duplicated when called by multiple components
        _store.dispatch(actions.getDatabaseUpdate(collection, result));
        callback(result);
    });
};

export const getDocument = (collection, doc) => {
    return database
        .collection(collection)
        .doc(doc)
        .get()
        .then((doc) => {
            if (doc.exists) {
                return doc.data();
            } else {
                // doc.data() will be undefined in this case

                return null;
            }
        });
};

export const getWithCondition = (collection, field, value) => {
    return database
        .collection(collection)
        .where(field, "==", value)
        .get()
        .then((querySnapshot) => {
            let result = [];
            querySnapshot.forEach((doc) => {
                let data = doc.data();
                data.id = doc.id;
                result.push(data);
            });
            return result;
        });
};

export const getImageURL = (imgPath) => {
    return storage
        .ref()
        .child(imgPath)
        .getDownloadURL()
        .then((url) => {
            return url;
        });
};

export const addDocument = (collection, newItem) => {
    newItem.timestamp = firebase.firestore.FieldValue.serverTimestamp();
    database
        .collection(collection)
        .add(newItem)
        .then(function () {
            let isSuccess = true;
            return isSuccess;
        })
        .catch(function (error) {
            let isSuccess = false;
            return isSuccess;
        });
};

export const setDocument = (collection, newItem, docName) => {
    return database
        .collection(collection)
        .doc(docName)
        .set({
            ...newItem,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(function () {
            // message.success('Hoàn thành!');
            let isSuccess = true;
            return isSuccess;
        })
        .catch(function (error) {
            // message.error('Lỗi: xin vui lòng thử lại!');
            let isSuccess = false;
            return isSuccess;
        });
};

export const updateDocument = (collection, updateItem, docName) => {
    return database
        .collection(collection)
        .doc(docName)
        .set(updateItem)
        .then(function () {
            return 'success'
        })
        .catch(function (error) {
            return error;
        });
};

// export const setSpecificDocument = ( collection, doc, updatedProperty ) => {
//
//     return database
//         .collection(collection)
//         .doc(doc)
//         .set(updatedProperty)
//         .then(function () {
//
//             message.success('Hoàn thành!');
//             let success = true;
//             return success;
//         })
//         .catch(function (error) {
//
//             message.error('Lỗi: xin vui lòng thử lại!');
//             let success = true;
//             return success;
//         })
// }

export const deleteDocument = (collection, doc) => {
    return database
        .collection(collection)
        .doc(doc)
        .delete()
        .then(function () {
            // message.success(`${doc} được xóa thành công!`);
            return true;
        })
        .catch(function (error) {
            // message.error(`Lỗi: ${doc} xóa thất bại!`);
            return false;
        });
};

export const uploadImage = (ref, file) => {
    return new Promise((_resolve, _reject) => {
        if (!file.old) {
            var storageRef = firebase.storage().ref();
            var uploadTask = storageRef.child(ref + file.name).put(file);
            // return uploadTask.snapshot.ref.getDownloadURL();

            uploadTask.on(
                "state_changed",
                function (snapshot) {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    var progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                    // switch (snapshot.state) {
                    //     case firebase.storage.TaskState.PAUSED: // or 'paused'
                    //
                    //         break;
                    //     case firebase.storage.TaskState.RUNNING: // or 'running'
                    //
                    //         break;
                    // }
                },
                function (error) {
                    // Handle unsuccessful uploads
                    message.error("Lỗi: upload hình ảnh thất bại!");
                    _reject(error);
                },
                function () {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    uploadTask.snapshot.ref
                        .getDownloadURL()
                        .then(function (downloadURL) {
                            if (downloadURL) {
                                _resolve(downloadURL);
                            } else {
                                message.error("Lỗi: upload hình ảnh thất bại!");
                                _reject();
                            }
                        })
                        .catch(() => {
                            message.error("Lỗi: upload hình ảnh thất bại!");
                            _reject();
                        });
                }
            );
        } else {
            message.error("Lỗi: upload hình ảnh thất bại!");
            _reject("File already existed");
        }
    });
};

export const listAllImage = (ref) => {
    var storageRef = firebase.storage().ref();
    var listRef = storageRef.child(ref);
    return listRef
        .listAll()
        .then(function (res) {
            return res;
        })
        .catch(function (error) {
            return null;
        });
};

export const deleteImage = (ref) => {
    var storageRef = firebase.storage().ref();
    var desertRef = storageRef.child(ref);
    let name = ref.split("/")[2];
    // Delete the file
    return desertRef
        .delete()
        .then(function () {
            // File deleted successfully
            // message.success(`Hình ảnh ${name} được xóa thành công!`);
            return true;
        })
        .catch(function (error) {
            // Uh-oh, an error occurred!
            // message.error(`Lỗi: xóa hình ảnh ${name} thất bại!`);
            return false;
        });
};
