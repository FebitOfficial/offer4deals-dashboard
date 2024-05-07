// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Import the functions you need from the SDKs you need

const firebaseConfig = {
  apiKey: "AIzaSyCDJpmx9D6-Vd0TVQThbWNyte4u-FPotPk",
  authDomain: "offer4deals-737a2.firebaseapp.com",
  projectId: "offer4deals-737a2",
  storageBucket: "offer4deals-737a2.appspot.com",
  messagingSenderId: "255405339197",
  appId: "1:255405339197:web:094011135337c070a27054",
  databaseURL:
    "https://offer4deals-737a2-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase
const db = getDatabase();
export const getProducts = () => {
  const productRef = ref(db, "products");
  return new Promise((resolve, reject) => {
    onValue(
      productRef,
      (snapshot) => {
        const data = snapshot.val();
        resolve(
          data
            .map((item) =>
              item.Products.map((product) => {
                return {
                  ...product,
                  category: {
                    name: item.Category,
                  },
                };
              })
            )
            .flat(Infinity)
        );
      },
      (error) => {
        reject(error);
      }
    );
  });
};
export const insertProduct = (product) => {
  const productRef = ref(db, "products");
  return new Promise((resolve, reject) => {
    onValue(
      productRef,
      (snapshot) => {
        const data = snapshot.val() || [];
        const categoryIndex = data.findIndex(
          (item) => item.Category === product.Category
        );
        if (categoryIndex !== -1) {
          data[categoryIndex].Products.push(product.Products[0]);
        } else {
          // Handle the case where the category does not exist
          data.push({
            Category: product.Category,
            Products: [product.Products[0]],
          });
        }
        console.log(data);

        set(ref(db, "products"), data);
        resolve(data);
      },
      {
        onlyOnce: true, // Ensures the listener is triggered only once
      },
      (error) => {
        reject(error);
      }
    );
  });
};

export const getImages = () => {
  const imagesRef = ref(db, "images");
  return new Promise((resolve, reject) => {
    onValue(
      imagesRef,
      (snapshot) => {
        const data = snapshot.val();
        resolve(data);
      },
      (error) => {
        reject(error);
      }
    );
  });
};
