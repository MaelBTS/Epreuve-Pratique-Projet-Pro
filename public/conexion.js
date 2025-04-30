// Configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBGoYpmTuglRwxcCfUkd6XWPXkkWHBdfJw",
    authDomain: "lapetitebulle0.firebaseapp.com",
    projectId: "lapetitebulle0",
    storageBucket: "lapetitebulle0.appspot.com",
    messagingSenderId: "886259840912",
    appId: "1:886259840912:web:9b2bf2c260205af05d6515"
};

// Initialisation de Firebase avec la méthode de Firebase v8
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Fonction de connexion sécurisée
document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMessage = document.getElementById("errorMessage");

    if (!email || !password) {
        errorMessage.textContent = "Veuillez remplir tous les champs.";
        return;
    }

    try {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Vérification si l'utilisateur est bien authentifié
        const userRef = db.collection("users").doc(user.uid);
        const doc = await userRef.get();

        if (doc.exists && doc.data().access) {
            // Si l'utilisateur est autorisé, redirection vers la page "boisson.html"
            window.location.href = "boisson.html";
        } else {
            // Si l'accès est refusé, afficher un message d'erreur
            throw new Error("Accès refusé. Contactez l'administrateur.");
        }

    } catch (error) {
        console.error("Erreur de connexion :", error);
        errorMessage.textContent = "Échec de connexion : " + error.message;
    }
});
