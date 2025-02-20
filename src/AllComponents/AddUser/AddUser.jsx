import React from "react";
import { Container, Form, Button, Row, Col, Alert, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setSearchGroup, setSelectedGroup, fetchGrp, addClient, addClientSuccess } from "../../redux/addUserSlice";
import Select from "react-select";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function AddUser() {
  const dispatch = useDispatch();
  const { searchGroup, groupes, selectedGroup, loading, addClientLoading, addClientError } = useSelector(
    (state) => state.addUser
  );

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Ce champ est obligatoire."),
    ref: Yup.string().required("Ce champ est obligatoire."),
  });

  const formik = useFormik({
    initialValues: {
      reference: "",
      fullName: "",
      phone: "",
      ref: "",
      email: "",
      isActive: false,
      type: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log("Données du formulaire avant l'envoi:", values);
      try {
        const jsonData = JSON.stringify(values);
        console.log("Données converties en JSON :", jsonData);
        const result = await dispatch(addClient(jsonData));
        if (result.payload) {
          dispatch(addClientSuccess(result.payload)); // Mise à jour Redux
        }
      } catch (error) {
        console.error("Erreur de conversion en JSON:", error);
      }
    },
  });

  const handleSelectGroup = (selectedOption) => {
    console.log("Groupe sélectionné:", selectedOption);
    dispatch(setSelectedGroup(selectedOption));
    formik.setFieldValue("groupe", selectedOption ? selectedOption.value : "");
  };

  const handleInputChange = (inputValue) => {
    dispatch(setSearchGroup(inputValue));
    if (inputValue.length > 2) {
      dispatch(fetchGrp(inputValue));
    }
  };

  const groupeOptions = groupes.map((group) => ({
    value: group.value,
    label: group.label,
  }));

  const type_users = [
    { id: 1, name: "Particulier" },
    { id: 2, name: "Entreprise" },
    { id: 3, name: "Association" },
    { id: 4, name: "Secteur Public" },
  ];

  return (
    <Container className="d-flex justify-content-center align-items-center vh-80">
      <Form onSubmit={formik.handleSubmit}>
        <h5 className="text-muted mb-4 border-bottom pb-2">Ajouter un client</h5>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Type</Form.Label>
              <Form.Select
                name="type"
                className="form-control-lg"
                value={formik.values.type}
                onChange={formik.handleChange}
              >
                {type_users.map((user) => (
                  <option key={user.id} value={user.name}>
                    {user.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>Groupe du Client</Form.Label>
              <Select
                id="groupe"
                name="groupe"
                options={groupeOptions}
                isLoading={loading}
                placeholder="Rechercher un groupe..."
                onInputChange={handleInputChange}
                onChange={handleSelectGroup}
                value={selectedGroup}
                isClearable
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Référence</Form.Label>
              <Form.Control
                id="ref"
                type="text"
                name="ref"
                className="form-control-lg"
                value={formik.values.ref}
                onChange={formik.handleChange}
              />
              {formik.touched.ref && formik.errors.ref ? (
                <div className="text-danger">{formik.errors.ref}</div>
              ) : null}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Nom</Form.Label>
              <Form.Control
                id="fullName"
                type="text"
                name="fullName"
                className="form-control-lg"
                value={formik.values.fullName}
                onChange={formik.handleChange}
              />
              {formik.touched.fullName && formik.errors.fullName ? (
                <div className="text-danger">{formik.errors.fullName}</div>
              ) : null}
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Téléphone</Form.Label>
              <Form.Control
                id="phone"
                type="tel"
                name="phone"
                className="form-control-lg"
                value={formik.values.phone}
                onChange={formik.handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                id="email"
                type="text"
                name="email"
                className="form-control-lg"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>ICE / CIN</Form.Label>
          <Form.Control
            id="ice"
            type="text"
            name="ice"
            className="form-control-lg"
            onChange={formik.handleChange}
          />
        </Form.Group>

        <Row className="mb-3">
          <Col md={4}>
            <Form.Group>
              <Form.Label>N° RC</Form.Label>
              <Form.Control
                id="rc"
                type="text"
                name="rc"
                className="form-control-lg"
                onChange={formik.handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>N° IF</Form.Label>
              <Form.Control
                id="if"
                type="text"
                name="if"
                className="form-control-lg"
                onChange={formik.handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>N° Patente</Form.Label>
              <Form.Control
                id="patente"
                type="text"
                name="patente"
                className="form-control-lg"
                onChange={formik.handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Check
          type="checkbox"
          name="isActive"
          label="Activer"
          checked={formik.values.isActive}
          onChange={formik.handleChange}
        />

        {/* {addClientError && <Alert variant="danger">{addClientError}</Alert>} */}





        <Button variant="primary" type="submit" disabled={addClientLoading}>
          {addClientLoading ? (
            <>
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              <span className="ms-2">Enregistrement...</span>
            </>
          ) : (
            "Enregistrer"
          )}
        </Button>
      </Form>
    </Container>
  );
}
