import React from "react";

import { Alert } from "neetoui";

const DeleteAlert = ({ showAlert, setShowAlert, deleteMethod, type }) => (
  <Alert
    isOpen={showAlert}
    title="Delete Alert"
    message={`Are you sure you want to delete the ${type}?`}
    onClose={() => setShowAlert(false)}
    onSubmit={deleteMethod}
  />
);

export default DeleteAlert;
