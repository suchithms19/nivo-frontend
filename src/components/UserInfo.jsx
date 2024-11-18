import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BACKEND_URL from '../config';
import { QRCodeSVG } from 'qrcode.react';
import ReactDOM from 'react-dom';

const UserInfo = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/user/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUser(response.data);
      } catch (err) {
        setError('Failed to fetch user information');
      }
    };

    fetchUserInfo();
  }, []);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  const businessUrl = `getnivo.tech/selfadd/${user.businessNameForUrl}`;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-lg w-full mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Account Information</h2>
        <div className="space-y-4">
          <div>
            <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
          </div>
          <div>
            <p className="text-gray-700 capitalize"><strong>Business Name:</strong> {user.businessName}</p>
          </div>
          <div>
            <p className="text-gray-700"><strong>Total User Count: </strong> {user.totalPatients}</p>
          </div>
          <div className="flex items-center justify-between bg-gray-100 p-2 rounded-md">
            <p className="text-gray-700"><strong>Business URL:</strong> {businessUrl}</p>
            <button 
              onClick={() => copyToClipboard(businessUrl)} 
              className="text-white hover:scale-105 bg-cuspurple border border-cuspurple rounded-md px-3 py-1"
            >
              Copy
            </button>
          </div>
          
          <div className="flex flex-col items-center mt-6">
            <h3 className="text-lg font-semibold mb-2">Business QR Code</h3>
            <div className="p-4 bg-white border rounded-lg qr-code">
              <QRCodeSVG 
                value={`https://${businessUrl}`} 
                size={200}
                level="H"
                includeMargin={true}
              />
            </div>
            <button 
              onClick={() => {
                // Create a new QRCode SVG for download
                const qrContainer = document.createElement('div');
                ReactDOM.render(
                  <QRCodeSVG 
                    value={`https://${businessUrl}`}
                    size={600}
                    level="H"
                    includeMargin={true}
                  />,
                  qrContainer
                );

                const svg = qrContainer.querySelector('svg');
                if (!svg) return;
                
                // Convert SVG to string and create a Base64 data URL
                const svgData = new XMLSerializer().serializeToString(svg);
                const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
                const DOMURL = window.URL || window.webkitURL || window;
                const url = DOMURL.createObjectURL(svgBlob);
                
                // Create an image to draw on canvas
                const img = new Image();
                const canvas = document.createElement('canvas');
                canvas.width = 600;
                canvas.height = 600;
                const ctx = canvas.getContext('2d');
                
                img.onload = () => {
                  ctx.drawImage(img, 0, 0);
                  DOMURL.revokeObjectURL(url);
                  
                  // Convert canvas to PNG with maximum quality
                  canvas.toBlob((blob) => {
                    const pngUrl = DOMURL.createObjectURL(blob);
                    const downloadLink = document.createElement('a');
                    downloadLink.download = `${user.businessName}-qr-code.png`;
                    downloadLink.href = pngUrl;
                    downloadLink.click();
                    DOMURL.revokeObjectURL(pngUrl);
                  }, 'image/png', 1.0);
                };
                
                img.src = url;
              }}
              className="mt-2 text-white hover:scale-105 bg-cuspurple border rounded-md px-3 py-1"
            >
              Download QR Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
