import type { NextApiRequest, NextApiResponse } from "next";

export default async (request: NextApiRequest, response: NextApiResponse<Record<string, string | string[] | undefined>>) => {

  if (request.method === "GET") {
    try {
      const {
        query: { yamlFile, dateString, resultsFile, redirect }
      } = request;
      console.log(`resultsFile: ${resultsFile}`, { query: request.query });
      if (resultsFile && !Array.isArray(resultsFile) && resultsFile.endsWith(".json")) {
        response.status(400).json({
          message: `method ${request.method} has a json file: ${resultsFile}`,
          yamlFile,
          dateString,
          resultsFile,
          redirect
        });
      } else {
        response.status(400).json({
          message: `method ${request.method} must have a json file`,
          yamlFile,
          dateString,
          resultsFile,
          redirect
        });
      }
    } catch (error) {
      response.status(500).json({
        message: `An error occurred: ${error instanceof Error ? error.message : String(error)}`
      });
    }
  } else {
    response.status(400).json({ message: `method ${request.method} is not supported for this endpoint` });
  }
};
