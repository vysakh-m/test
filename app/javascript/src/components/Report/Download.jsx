import React, { useState, useEffect } from "react";

import { Download as DownloadIcon } from "neetoicons";
import { Typography, Button, PageLoader } from "neetoui";

import reportApi from "apis/reports";

const Download = () => {
  const [isPreparingDownload, setIsPreparingDownload] = useState(true);
  const [jobId, setJobId] = useState("");

  const getJobId = async () => {
    const { data } = await reportApi.request();
    setJobId(data.jid);
  };

  useEffect(() => {
    getJobId();
  }, []);

  useEffect(() => {
    let intervalId = setInterval(async () => {
      const { data } = await reportApi.status(jobId);
      if (data.percentage === "100") {
        clearInterval(intervalId);
        setIsPreparingDownload(false);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [jobId]);

  const downloadReport = async () => {
    const { data } = await reportApi.download(jobId);
    let tempLink = document.createElement("a");
    tempLink.href = URL.createObjectURL(data);
    tempLink.setAttribute("download", "report.xlsx");
    tempLink.click();
  };

  return (
    <div className="p-10 space-y-10 text-center">
      {isPreparingDownload ? (
        <div className="h-64">
          <PageLoader text="Your report is being prepared for downloading" />
        </div>
      ) : (
        <div className="space-y-10 mt-16">
          <Typography style="h3">Report is now ready for download.</Typography>
          <Button
            label="Download report"
            onClick={downloadReport}
            style="primary"
            icon={DownloadIcon}
            iconPosition="left"
          />
        </div>
      )}
    </div>
  );
};

export default Download;
