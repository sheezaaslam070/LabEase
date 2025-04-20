import config from './config.js';

const { url } = config;

document.addEventListener("DOMContentLoaded", async () => {  
  try {
      // Fetch all report data
      const [pcReports, internetReports, furnitureReports, circuitReports] = await Promise.all([
          fetch(`${url}/api/report/all-pc-reports`).then(res => res.json()),
          fetch(`${url}/api/report/all-internet-reports`).then(res => res.json()),
          fetch(`${url}/api/report/all-furniture-reports`).then(res => res.json()),
          fetch(`${url}/api/report/all-circuit-reports`).then(res => res.json())
      ]);

      // Combine all reports
      const allReports = [...pcReports, ...internetReports, ...furnitureReports, ...circuitReports];
      
      // Count reports per lab
      const labReportCount = {};
      allReports.forEach(report => {
          labReportCount[report.labName] = (labReportCount[report.labName] || 0) + 1;
      });
      
      // Sort labs by number of reports in descending order & take top 8
      const topLabs = Object.entries(labReportCount)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 8);
      
      // Extract data for line chart
      const labNames = topLabs.map(entry => entry[0]);
      const labReportCounts = topLabs.map(entry => entry[1]);

      // Update Line Chart
      const lineChartCanvas = document.getElementById("lineChart").getContext("2d");
      new Chart(lineChartCanvas, {
          type: "line",
          data: {
              labels: labNames,
              datasets: [{
                  label: "Top 8 Labs with Most Reports",
                  data: labReportCounts,
                  backgroundColor: "rgba(54, 162, 235, 0.2)",
                  borderColor: "rgba(54, 162, 235, 1)",
                  borderWidth: 2,
                  fill: true,
              }]
          },
          options: {
              responsive: true,
              scales: { y: { beginAtZero: true } }
          }
      });
      
      // Prepare data for bar chart
      const reportCounts = {
          "PC Reports": pcReports.length,
          "Internet Reports": internetReports.length,
          "Furniture Reports": furnitureReports.length,
          "Circuit Reports": circuitReports.length
      };
      
      // Update Bar Chart
      const barChartCanvas = document.getElementById("barChart").getContext("2d");
      new Chart(barChartCanvas, {
          type: "bar",
          data: {
              labels: Object.keys(reportCounts),
              datasets: [{
                  label: "Number of Reports per Category",
                  data: Object.values(reportCounts),
                  backgroundColor: [
                      "rgba(255, 99, 132, 0.2)",
                      "rgba(54, 162, 235, 0.2)",
                      "rgba(255, 206, 86, 0.2)",
                      "rgba(75, 192, 192, 0.2)"
                  ],
                  borderColor: [
                      "rgba(255, 99, 132, 1)",
                      "rgba(54, 162, 235, 1)",
                      "rgba(255, 206, 86, 1)",
                      "rgba(75, 192, 192, 1)"
                  ],
                  borderWidth: 1
              }]
          },
          options: {
              responsive: true,
              scales: { y: { beginAtZero: true } }
          }
      });
      
  } catch (error) {
      console.error("Error fetching reports:", error);
  }
});