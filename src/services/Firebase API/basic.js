import { database } from "../../firebase";
import { storage } from "../../firebase";

export const fetchAll = (collection) => {
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

export const fetchWithCondition = (collection, field, value) => {
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

export const fetchDefaultProducts = () => {
    return database
        .collection("products")
        .where('visibility', "==", true)
        .where('default', '==', true)
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

export const countSupportedFabric = (designID) => {
    return database
        .collection("products")
        .where('visibility', "==", true)
        .where('designID', '==', designID)
        .get()
        .then((querySnapshot) => {
            let result = querySnapshot.size || 0;
            return result;
        });
};

export const fetchDesignOwner = (designID) => {
    return database
        .collection("designers")
        .where('designs', "array-contains", designID)
        .get()
        .then((querySnapshot) => {
            let result = querySnapshot.docs[0].data().name || "";
            return result;
        });
};
