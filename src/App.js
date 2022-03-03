import React, { useState, useEffect } from "react";
import "./App.css";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import Tabletop from 'tabletop';

function App() {

  const [dataSheet, setDataSheet] = useState([]);

  const handleSubmit = (values) => {
    //console.log(values);
    let body = { ...values, date: new Date() };
    console.log(body);
    // TODO: realizar la petición
    axios
      .post(
        "https://sheet.best/api/sheets/2ea755cb-5aa0-485d-805d-24e0a1018f16",
        body
      )
      .then((res) => {
        console.log(res);
      });
  };

  const getDataGoogleSheet = () => {
    // TODO: agregar el Tabletop y realizar setDataSheet(googleData)
  }

  useEffect(() => {
    getDataGoogleSheet();
  }, []);

  return (
    <div className="container">
      <h2>Formulario</h2>
      <Formik
        initialValues={{
          name: "",
          surname: "",
          phone: "",
          dpi: "",
          email: "",
          date: "",
        }}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Nombre:</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  value={values.name}
                  placeholder="Nombre"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="text-danger">
                  {errors.name && touched.name && errors.name}
                </div>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Apellidos:</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  value={values.surname}
                  placeholder="Apellidos"
                  name="surname"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="text-danger">
                  {errors.surname && touched.surname && errors.surname}
                </div>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Teléfono:</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  value={values.phone}
                  placeholder="Teléfono"
                  name="phone"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="text-danger">
                  {errors.phone && touched.phone && errors.phone}
                </div>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">DPI:</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  value={values.dpi}
                  placeholder="DPI"
                  name="dpi"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="text-danger">
                  {errors.dpi && touched.dpi && errors.dpi}
                </div>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Email:</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  value={values.email}
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="text-danger">
                  {errors.email && touched.email && errors.email}
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary">
                Guardar
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

const validationSchema = yup.object().shape({
  name: yup.string().required("El Nombre es requerido"),
  surname: yup.string().required("El Apellido es requerido"),
  phone: yup.string().required("El Telefono es requerido"),
  dpi: yup
    .string()
    .required("El DPI es requerido")
    .matches(/^[0-9]{4}\s?[0-9]{5}\s?[0-9]{4}$/, "El DPI no es válido"), //Con la siguiente función lambda validamos que el DPI exista
  email: yup
    .string()
    .email("Formato de Email inválido")
    .required("El email es requerido"),
});

export default App;
