import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { fetchClients, setSelectedClient, setSearchTerm } from "../../redux/recherchClientSlice";
import { clearLastAddedClient } from "../../redux/addUserSlice"; // Ajout de l'import manquant


const RecherchClient = () => {
    const dispatch = useDispatch();

    // Récupération des données depuis Redux
    const clients = useSelector((state) => state.rechercheClient.clients);
    const loading = useSelector((state) => state.rechercheClient.loading);
    const selectedClient = useSelector((state) => state.rechercheClient.selectedClient);

    // Récupération du dernier client ajouté
    const lastAddedClient = useSelector((state) => state.addUser.lastAddedClient);

    // Gestion du changement de recherche
    const handleInputChange = (inputValue) => {
        console.log("Recherche en cours avec :", inputValue);
        dispatch(setSearchTerm(inputValue));

        // Déclenche la recherche uniquement si l'entrée dépasse 2 caractères
        if (inputValue.length > 2) {
            dispatch(fetchClients({ termeRecherche: inputValue, phoneRecherche: "", refRecherche: "" }));
        }
    };

    // Gestion de la sélection d’un client
    const handleSelectClient = (selectedOption) => {
        if (selectedOption) {
            dispatch(setSelectedClient(selectedOption.clientData));
        } else {
            dispatch(setSelectedClient(null)); // Si aucun client n'est sélectionné
        }
    };
    // Effet pour sélectionner automatiquement le dernier client ajouté
    useEffect(() => {
        console.log("Last Added Client:", lastAddedClient);
        if (lastAddedClient) {
            dispatch(setSelectedClient(lastAddedClient));

            dispatch(clearLastAddedClient()); // Nettoie après la mise à jour
        }
    }, [lastAddedClient, dispatch]);
    // Options pour le composant Select
    const options = clients;

    
    // Valeur actuelle du Select
    const selectValue = selectedClient
    ? { value: selectedClient.id, label: selectedClient.fullName }
    : lastAddedClient
    ? { value: lastAddedClient.id, label: lastAddedClient.fullName }
    : null;
    return (
        <div className="container mt-1">
            <Select
                options={options}
                isLoading={loading}
                placeholder="Rechercher un client..."
                onInputChange={handleInputChange} // Déclenche la recherche immédiatement
                onChange={handleSelectClient} // Sélectionner un client
                isClearable
                value={selectValue} // Afficher le dernier client ajouté ou le client sélectionné
            />

            {selectedClient && (
                <div className="mt-1 p-2 border rounded bg-light" style={{ width: '200px' }}>
                    <strong>Compte : </strong>
                    <span className={`text-truncate ${selectedClient.compte >= 0 ? 'text-success' : 'text-danger'}`}>
                        {selectedClient.compte} dh
                    </span>
                </div>
            )}
        </div>
    );
};

export default RecherchClient;