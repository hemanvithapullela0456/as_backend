

# 🌍 **Expedia - Redefining Export Management** 🚀  

### **📖 About**  
Expedia's backend provides the critical API functionality for the platform's **Carrier Comparison** feature. Built using **Node.js** and **Express**, it powers seamless data retrieval and integration, ensuring a smooth experience for Indian SMBs navigating global exports.  


---

### **✨ Features**  
- 🚛 **Carrier Comparison API**: Fetch carrier recommendations based on cost, delivery time, and shipment type.  
- 🌦️ **Weather API Integration**: Retrieve real-time weather data for shipping destinations to optimize planning and avoid delays.  
- ☁️ **Serverless Functions**: Deployed on Netlify for scalability and performance.  
- ⚡ **Express.js Integration**: Efficient routing and RESTful API structure.  

---

### **🛠️ Technologies Used**  
- **⚙️ Node.js**  
- **🛤️ Express.js**  
- **☁️ Netlify**  

---

### **🔗 API Endpoints**  

| ⚡ **Method** | 🌐 **Endpoint**                    | 📝 **Description**                            |  
|---------------|------------------------------------|-----------------------------------------------|  
| **GET**       | `/api/carrier-comparison`         | Fetches carrier data for comparison.          |  
| **GET**       | `/api/weather`                    | Retrieves weather data for the given location.|  
 

---

**📋 Example Query String:**  
```http  
GET /api?origin=Mumbai&destination=London&weight=20&type=fragile  
```  

**📋 Example Response:**  
```json  
{
  "status": "success",
  "data": [
    {
      "carrier": "DHL",
      "price": 500,
      "estimated_delivery": "5 days",
      "rating": 4.8
    },
    {
      "carrier": "FedEx",
      "price": 450,
      "estimated_delivery": "4 days",
      "rating": 4.5
    },
    {
      "carrier": "Blue Dart",
      "price": 600,
      "estimated_delivery": "6 days",
      "rating": 4.2
    }
  ]
}
```  

---

### **🚀 Deployment**  
The backend is deployed on **Netlify**.  
[🌐 Backend Deployment Link](https://keen-unicorn-487a0d.netlify.app/.netlify/functions/api)  

---

### **📜 License**  
This project is licensed under the **MIT License**.  

---

## 💻 Contributors

- [Avani Gupta](https://github.com/guptaavani111)
- [Chandrima Hazra](https://github.com/hazraChandrima)
- [Hemanvitha Pullela](https://github.com/hemanvithapullela0456)
- [Jaya Kumari](https://github.com/jaya005)
