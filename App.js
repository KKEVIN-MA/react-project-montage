// import { useState } from "react";
// import "./App2.css";
// export default function App2() {
//     const [Nom, setNom] = useState("");
//     const [Prenom, setPrenom] = useState("");
//     const [Mssg, setMssg] = useState("Taper votre message...");
//     const [City, setCity] = useState("");
//     const [Sexe, setSexe] = useState(""); 
//     function handleNomChange(event) {
//         setNom(event.target.value);
//     }

//     function handlePrenomChange(event) {
//         setPrenom(event.target.value);
//     }

//     function handleMssgFocus() {
//         if (Mssg === "Taper votre message...") {
//             setMssg("");
//         }
//     }

//     function handleMssgChange(event) {
//         setMssg(event.target.value);
//     }

//     function handleCityChange(event) {
//         setCity(event.target.value);
//     }

//     function handleSexeChange(event) {
//         setSexe(event.target.value);
//     }

//     function alerting(event) {
//         event.preventDefault();
//         alert(
//             "Votre nom est: " + Nom +
//             "\nVotre Prenom est: " + Prenom +
//             "\nSexe: " + Sexe +
//             "\nVille: " + City +
//             "\nMessage: " + Mssg
//         );
//     }

//     return (
//         <form onSubmit={alerting}>
//             <label>Nom</label>
//             <input type="text" onChange={handleNomChange} value={Nom} />

//             <label>Prenom</label>
//             <input type="text" onChange={handlePrenomChange} value={Prenom} />

//             <br />

//             <label>Sexe:</label>
//             <input
//                 type="checkbox"
//                 value="Homme"
//                 onChange={handleSexeChange}
//                 checked={Sexe === "Homme"}
//             />
//             <label>Homme</label>

//             <input
//                 type="checkbox"
//                 value="Femme"
//                 onChange={handleSexeChange}
//                 checked={Sexe === "Femme"}
//             />
//             <label>Femme</label>

//             <br />

//             <label>Message</label>
//             <textarea
//                 onFocus={handleMssgFocus}
//                 onChange={handleMssgChange}
//                 value={Mssg}
//             />

//             <label>Ville</label>
//             <select onChange={handleCityChange}>
//                 <option value="">Sélectionnez une ville</option>
//                 <option value="city1">city1</option>
//                 <option value="city2">city2</option>
//                 <option value="city3">city3</option>
//                 <option value="city4">city4</option>
//                 <option value="city5">city5</option>
//                 <option value="city6">city6</option>
//                 <option value="city7">city7</option>
//                 <option value="city8">city8</option>
//             </select>

//             <button type="submit">Click me</button>
//         </form>
//     );
// }
