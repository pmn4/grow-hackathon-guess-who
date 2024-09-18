#CONTEXT: Adopt the role of an expert system design architect specializing in building interactive dashboards using D3.js and data visualization technologies. Your task is to create a detailed technical specification for developing an application that generates an interactive dashboard, similar to the one shown in the uploaded image. The application should display real-time data from the Datadog Synthetics API, using Datadog OAuth to grant secure access. The design must include various data visualization components such as line graphs, bar charts, pie charts, maps, and other interactive elements. The dashboard should be responsive and scalable.

#GOAL: You will create a set of comprehensive technical specifications to guide a developer in building an interactive D3.js dashboard that visualizes real-time data from the Datadog Synthetics API. The application must authenticate users securely using OAuth, pull relevant data, and display it in an interactive, user-friendly format.

#RESPONSE GUIDELINES: Follow the detailed step-by-step approach below to guide the developer in building the application:

1.  **System Architecture Design**

    -   **Frontend:** see @prompts/instructions/frontend-instructions.md
    -   **Backend:** see @prompts/instructions/backend-instructions.md
    -   **Authentication:** Use Datadog OAuth for user authentication and authorization.
    -   **API Communication:** Fetch real-time data using the Datadog Synthetics API. Use websockets or long polling to maintain real-time updates on the dashboard.

2.  **Datadog OAuth Setup**

    -   **Datadog App Registration:** Register the application on the Datadog platform to obtain OAuth credentials.
    -   **OAuth Flow:**
        -   Implement the OAuth 2.0 authorization code flow to authenticate users.
        -   Ensure secure storage of OAuth tokens and refresh tokens using best security practices (e.g., environment variables, encrypted storage).
        -   Refresh tokens periodically to maintain continuous access to the Datadog API.

3.  **Data Management**

    -   **API Integration:**
        -   Use the Datadog Synthetics API endpoints to fetch synthetic monitoring data in real time.
        -   Handle error conditions such as API rate limits and network interruptions.
    -   **Data Transformation:** Format and preprocess the data into structures that can be consumed by D3.js visualizations.
        -   Example data structures: arrays of objects representing time series data for graphs, categorical data for pie charts, etc.
        -   Implement data throttling if necessary to prevent overwhelming the client with too many API requests.

4.  **UI/UX Design**

    -   **Dashboard Layout:** Organize the dashboard in a clean, intuitive layout similar to the provided image, using CSS grid or a layout library (e.g., Material-UI or Tailwind).
        -   **Interactive elements:** Include line charts, bar charts, pie charts, radial gauges, maps, and spider charts as shown in the image.
        -   **Responsiveness:** Ensure the dashboard is responsive and works on various screen sizes, from desktops to mobile devices.
    -   **User Interaction:**
        -   Enable tooltips that appear on hover, providing additional details about each data point.
        -   Allow filtering by date range, synthetic test type, and test results (success/failure).
        -   Include zoom and pan functionalities on line graphs for in-depth data exploration.
    -   **Real-time Updates:**
        -   Ensure real-time updates are reflected on the dashboard with smooth animations for data changes.
        -   Implement a notification system to alert users of failed or degraded synthetic tests.

5.  **Visualization Components**

    -   **Line Chart (Trend of Synthetic Test Performance):**
        -   Use D3.js to create a line chart showing the performance of synthetic tests over time. Use dynamic scaling to handle multiple tests and large datasets.
    -   **Pie Charts (Test Results Breakdown):**
        -   Visualize the success, failure, and ongoing synthetic test statuses using pie charts. Fetch percentage data directly from the API.
    -   **Bar Charts (Test Duration Comparisons):**
        -   Display test duration comparisons over time or by different synthetic tests using dynamic bar charts.
    -   **Geographic Map (Location of Test Results):**
        -   Display synthetic test results based on geographical locations using a D3.js map with real-time data markers.
    -   **Spider/Radar Chart (Test Metrics Comparison):**
        -   Compare different synthetic test metrics such as uptime, response time, and errors using a spider/radar chart.

6.  **Error Handling**

    -   **UI Errors:** Display user-friendly error messages for issues such as API access problems, expired OAuth tokens, or data fetch failures.
    -   **Logging:** Implement server-side logging for OAuth errors, API request issues, and frontend crashes.
    -   **Retry Logic:** Add retry mechanisms for API calls in case of network failure or rate limit issues.

7.  **Security**

    -   **OAuth Token Storage:** Store OAuth tokens securely on the backend, never exposing them to the frontend directly.
    -   **CSRF and XSS Prevention:** Implement secure headers, use a CSRF token for forms, and sanitize inputs.
    -   **HTTPS:** Ensure the application is served over HTTPS to encrypt all communication between the client and server.

8.  **Deployment and Scaling**

    -   **Hosting:** Host the frontend on a service like Vercel, Netlify, or AWS S3. Host the backend on a service like Heroku, AWS Lambda, or Google Cloud Functions.
    -   **Real-time Scalability:** Use serverless functions or scale your Node.js backend to handle multiple API requests efficiently.
    -   **Database (Optional):** If long-term storage of synthetic test results is required, consider adding a database (e.g., MongoDB, PostgreSQL) to store historical data.

9.  **Testing and Monitoring**

    -   **Unit Tests:** Write unit tests for key components using Jest (for React) or Mocha/Chai (for Node.js).
    -   **Integration Tests:** Use Datadog's API in test mode to validate that synthetic test data is being fetched and displayed correctly.
    -   **Monitoring:** Set up monitoring using Datadog APM to track the performance and error rates of the application.

#INFORMATION ABOUT ME:

-   My project type: [INTERACTIVE DASHBOARD USING D3.JS]
-   My data source: [DATADOG SYNTHETICS API]
-   My OAuth provider: [DATADOG OAUTH]
-   My visualizations: [LINE CHART, PIE CHART, BAR CHART, MAP, SPIDER/RADAR CHART]
-   My hosting platform: [HEROKU]
-   My security concerns: [TOKEN STORAGE, HTTPS, CSRF, XSS PREVENTION]
-   My backend stack: [NextJS]

#OUTPUT: The application must be a fully responsive, interactive dashboard using D3.js visualizations that pull real-time data from the Datadog Synthetics API via OAuth authentication. The design must prioritize user experience, offering rich interactivity, real-time updates, and comprehensive error handling. Output should also include smooth animations and clear data displays. The code should follow best practices for security, scalability, and performance.
