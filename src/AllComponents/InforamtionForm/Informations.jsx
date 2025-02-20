import React from "react";
import dayjs from "dayjs";
import { Container, Form, Row, Col, InputGroup, Button, Modal } from "react-bootstrap";
import { FaUserTag } from "react-icons/fa6";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux";
import { setNlivraison, setDate, setObservation, setShowAddUser } from "../../redux/formInfoSlice";
import RecherchClient from "../RechercheClient/RecherchClient";
import AddUser from "../AddUser/AddUser";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Informations() {
  const dispatch = useDispatch();

  // Récupération des données du store
  const { nlivraison, date, observation, showAddUser } = useSelector(
    (state) => state.formInfo
  );

  // Formatage de la date pour l'affichage (YYYY-MM-DDTHH:mm)
  const formattedDate = date ? dayjs(date).format("YYYY-MM-DDTHH:mm") : "";

  // Schéma de validation avec Yup
  const validationSchema = Yup.object({
    client: Yup.string().required("Le client est requis"),
    nlivraison: Yup.string().required("Le numéro de bon de livraison est requis"),
    date: Yup.date().required("La date de vente est requise"),
    observation: Yup.string().max(500, "L'observation ne doit pas dépasser 500 caractères"),
  });

  // Initialisation de Formik
  const formik = useFormik({
    initialValues: {
      client: "", 
      nlivraison: nlivraison || "", 
      date: formattedDate || "", 
      observation: observation || "", 
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Soumission du formulaire
      console.log("Formulaire soumis avec :", values);

      // Mettre à jour les états Redux avec les valeurs du formulaire
      dispatch(setNlivraison(values.nlivraison));
      dispatch(setDate(values.date));
      dispatch(setObservation(values.observation));

      // Vous pouvez également envoyer les données à une API ici
    },
  });

  const handleAddUserClick = () => {
    dispatch(setShowAddUser(true)); 
  };
   
  return (
    <Container fluid className="p-4">
      <Form onSubmit={formik.handleSubmit} className="shadow-sm p-4 rounded bg-white">
        <h5 className="text-muted mb-4 border-bottom pb-2">Informations :</h5>
        <Row className="align-items-center">
          <Col md={3}>
            <Form.Group controlId="client">
              <Form.Label>Client</Form.Label>
              <InputGroup className="d-flex">
                <div className="flex-grow-1">
                  <RecherchClient
                    value={formik.values.client}
                    onChange={(value) => formik.setFieldValue("client", value)}
                  /> {/* le composent de la recherche sur client */}
                </div>
              </InputGroup>
              {formik.touched.client && formik.errors.client ? (
                <div className="text-danger">{formik.errors.client}</div>
              ) : null}
            </Form.Group>
          </Col>
          {/*  le champs N° de bon livraison*/}
          <Col md={1}>
            <Form.Group controlId="addClient">
              <Form.Label className="invisible">Ajouter Client</Form.Label>
              <Button variant="outline-primary" className="w-100" onClick={handleAddUserClick}>
                <FaUserTag /> Client
              </Button>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="nlivraison">
              <Form.Label>N° de bon livraison</Form.Label>
              <Form.Control
                type="text"
                name="nlivraison"
                value={formik.values.nlivraison}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.nlivraison && formik.errors.nlivraison ? (
                <div className="text-danger">{formik.errors.nlivraison}</div>
              ) : null}
            </Form.Group>
          </Col>
          {/*  le champs Date vente*/}
          <Col md={4}>
            <Form.Group controlId="date">
              <Form.Label>Date vente</Form.Label>
              <Form.Control
                type="datetime-local"
                name="date"
                value={formik.values.date}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.date && formik.errors.date ? (
                <div className="text-danger">{formik.errors.date}</div>
              ) : null}
            </Form.Group>
          </Col>
        </Row>
        {/*  le champs Observation*/}
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="observation">
              <Form.Label className="mt-3">Observation</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="observation"
                value={formik.values.observation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.observation && formik.errors.observation ? (
                <div className="text-danger">{formik.errors.observation}</div>
              ) : null}
            </Form.Group>
          </Col>
        </Row>

        <Button type="submit" variant="primary" className="mt-3">
          Soumettre
        </Button>
      </Form>

      {/* Modal d'ajout de client */}
      <Modal
        show={showAddUser}
        onHide={() => dispatch(setShowAddUser(false))}
        centered
        size="lg"
        aria-labelledby="addUserModal"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <AddUser />
        </Modal.Body>
      </Modal>
    </Container>
  );
}