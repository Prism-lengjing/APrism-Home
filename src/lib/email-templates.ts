
export const getEmailTemplate = (title: string, contentHtml: string, previewText?: string) => {
  const logoUrl = "https://aprism.top/images/team/logo.png"; // Replace with actual production URL if different
  const year = new Date().getFullYear();

  return `
<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <title>${title}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', Roboto, Helvetica, Arial, sans-serif;
      font-size: 16px;
      line-height: 1.6;
      color: #1d1d1f;
      background-color: #f5f5f7;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    
    a {
      color: #007aff;
      text-decoration: none;
    }
    
    .wrapper {
      width: 100%;
      background-color: #f5f5f7;
      padding: 40px 0;
    }
    
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 18px;
      overflow: hidden;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
    }
    
    .header {
      padding: 32px 40px;
      text-align: center;
      border-bottom: 1px solid #f0f0f0;
    }
    
    .logo {
      font-size: 20px;
      font-weight: 600;
      color: #1d1d1f;
      letter-spacing: -0.02em;
    }
    
    .content {
      padding: 40px;
    }
    
    .footer {
      padding: 32px 40px;
      background-color: #fafafa;
      text-align: center;
      font-size: 12px;
      color: #86868b;
      border-top: 1px solid #f0f0f0;
    }
    
    h1 {
      font-size: 24px;
      font-weight: 600;
      margin-top: 0;
      margin-bottom: 24px;
      letter-spacing: -0.02em;
    }
    
    p {
      margin-top: 0;
      margin-bottom: 24px;
    }
    
    .button {
      display: inline-block;
      background-color: #007aff;
      color: #ffffff !important;
      padding: 12px 24px;
      border-radius: 980px;
      font-weight: 500;
      font-size: 14px;
      text-align: center;
      margin: 16px 0;
    }
    
    .info-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 24px;
    }
    
    .info-table td {
      padding: 8px 0;
      border-bottom: 1px solid #f5f5f7;
    }
    
    .info-label {
      font-weight: 600;
      width: 100px;
      color: #86868b;
    }
    
    @media only screen and (max-width: 600px) {
      .wrapper { padding: 20px 10px; }
      .container { width: 100% !important; border-radius: 12px; }
      .header, .content, .footer { padding: 24px; }
    }
  </style>
</head>
<body>
  <div style="display:none;font-size:1px;color:#333333;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">
    ${previewText || title}
  </div>
  
  <div class="wrapper">
    <div class="container">
      <!-- Header -->
      <div class="header">
        <div class="logo">
          AperturePrism
        </div>
      </div>
      
      <!-- Main Content -->
      <div class="content">
        ${contentHtml}
      </div>
      
      <!-- Footer -->
      <div class="footer">
        <p>Innovation Refracted Through Design.</p>
        <p>
          &copy; ${year} AperturePrism. All rights reserved.<br>
          <a href="https://aprism.top" target="_blank">aprism.top</a>
        </p>
      </div>
    </div>
  </div>
</body>
</html>
  `;
};
