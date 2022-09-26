import React, { useState, useEffect, useMemo } from "react";

import { Plus, Edit, Delete } from "neetoicons";
import { Button, PageLoader, Typography } from "neetoui";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

import quizApi from "apis/quizzes";

import Table from "./Table";

import EmptyData from "../Common/EmptyData";
import Container from "../Container";
import DeleteAlert from "../Quizzes/DeleteAlert";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [quizzes, setQuizzes] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [deleteQuizId, setDeleteQuizId] = useState("");
  let history = useHistory();

  const fetchData = async () => {
    try {
      const { data } = await quizApi.list();
      setQuizzes(data.quizzes);
    } catch (error) {
      logger.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateQuiz = id => {
    history.push(`/quizzes/${id}/edit`);
  };

  const showDeleteConfirmation = id => {
    setDeleteQuizId(id);
    setShowAlert(true);
  };

  const deleteQuiz = async () => {
    setIsLoading(true);
    setShowAlert(false);
    try {
      await quizApi.destroy(deleteQuizId);
      fetchData();
      setDeleteQuizId("");
    } catch (error) {
      logger.error(error);
      setIsLoading(false);
    }
  };

  const data = useMemo(() => quizzes, [quizzes]);
  const columns = useMemo(
    () => [
      {
        Header: "Quiz name",
        accessor: "title",
        Cell: ({ row }) => (
          <Link to={`/quizzes/${row.original.id}`}>{row.original.title}</Link>
        ),
      },
      {
        id: "actions",
        Cell: ({ row }) => (
          <div className="text-right space-x-5">
            <Button
              label="Edit"
              style="secondary"
              icon={Edit}
              iconPosition="left"
              onClick={() => updateQuiz(row.original.id)}
            />
            <Button
              label="Delete"
              style="danger"
              icon={Delete}
              iconPosition="left"
              onClick={() => showDeleteConfirmation(row.original.id)}
            />
          </div>
        ),
      },
    ],
    []
  );

  return (
    <Container>
      {isLoading ? (
        <div className="h-below-nav">
          <PageLoader />
        </div>
      ) : (
        <div className="w-full pt-10 px-10 text-center">
          <div className="flex justify-end">
            <Button
              label="Add new quiz"
              size="large"
              icon={Plus}
              iconPosition="left"
              to="/quizzes/create"
            />
          </div>

          {quizzes.length === 0 ? (
            <EmptyData description="You have not created any quiz." />
          ) : (
            <>
              <Typography className="text-left mt-3" style="h1">
                List of quizzes
              </Typography>
              <Table columns={columns} data={data} />
            </>
          )}
        </div>
      )}
      <DeleteAlert
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        deleteMethod={deleteQuiz}
        type="quiz"
      />
    </Container>
  );
};

export default Dashboard;
