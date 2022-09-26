import React, { useEffect, useState, useMemo } from "react";

import { Download as DownloadIcon } from "neetoicons";
import { Typography, Button, PageLoader } from "neetoui";

import reportApi from "apis/reports";

import { REPORTS_TABLE_HEADER } from "./constants";
import Download from "./Download";

import EmptyData from "../Common/EmptyData";
import Container from "../Container";
import Table from "../Dashboard/Table";

const Report = () => {
  const [reportData, setReportData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloadClicked, setIsDownloadClicked] = useState(false);

  const fetchData = async () => {
    try {
      const { data } = await reportApi.list();
      setReportData(data.attempts);
    } catch (error) {
      logger.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const data = useMemo(() => reportData, [reportData]);
  const columns = useMemo(() => REPORTS_TABLE_HEADER, []);

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Container>
      {isLoading ? (
        <div className="h-below-nav">
          <PageLoader />
        </div>
      ) : (
        <div className="p-10 space-y-10 text-center">
          {data.length > 0 ? (
            <>
              <div className="flex justify-between">
                <Typography
                  className="font-extrabold neeto-ui-text-gray-600"
                  style="h2"
                >
                  Reports
                </Typography>
                {!isDownloadClicked && (
                  <Button
                    label="Download"
                    style="primary"
                    icon={DownloadIcon}
                    iconPosition="left"
                    onClick={() => setIsDownloadClicked(true)}
                  />
                )}
              </div>
              {isDownloadClicked ? (
                <Download />
              ) : (
                <Table data={data} columns={columns} type="report" />
              )}
            </>
          ) : (
            <div className="h-full">
              <EmptyData description="No reports available" />
            </div>
          )}
        </div>
      )}
    </Container>
  );
};

export default Report;
