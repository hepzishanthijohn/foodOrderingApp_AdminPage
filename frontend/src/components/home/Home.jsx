import React from 'react';
import { FaCheckDouble, FaCheckCircle, FaExclamationCircle, FaQuestionCircle } from 'react-icons/fa';
import { Bar } from 'react-chartjs-2';
import BoxCount from '../BoxCount/BoxCount'
import './Home.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const HomePage = () => {
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Performance',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Performance',
      },
    },
  };

  return (
   <>
   
    <div className="dashboard-container">
    <div style={{paddingTop:"2%",width:"100%",paddingBottom:"2%"}}>
    <BoxCount />
    </div>
      {/* Main Content */}
      <div className="main-content">
      
        {/* Left Column */}
        <div className="left-column">
          <div className="top-section">
            <div className="totals-box">
              <div className="total-item">
                <p>Total Income</p>
                <h2>$12,890,00</h2>
              </div>
              <div className="total-item">
                <p style={{color:"green"}}>Income</p>
                <h3>$4,355,00</h3>
              </div>
              <div className="total-item">
                <p style={{color:"red"}}>Expense</p>
                <h3>$1,000</h3>
              </div>
              <div className="total-item">
                <button>Withdraw $</button>
              </div>
            </div>
          </div>

          <div className="chart-container">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Right Column */}
        <div className="right-column">
          <div className="total-orders-box">
            <h3>Total Orders</h3>
            <div className="orders-summary">
              <div className="orders-value">3,567</div>
              <div className="orders-change">+12% this month</div>
            </div>
          </div>

          <div className="performance-container">
            <div className="arc-progress">
              <div className="progress-value">70%</div>
              <div className="progress-label">Performance</div>
            </div>
          </div>

          <div className="order-status">
            <div className="status-item">
              <FaCheckDouble />
              <div>
                <p>Total Order Completed</p>
                <span>2,678</span>
              </div>
            </div>
            <div className="status-item">
              <FaCheckCircle />
              <div>
                <p>Total Order Delivered</p>
                <span>1,234</span>
              </div>
            </div>
            <div className="status-item">
              <FaExclamationCircle />
              <div>
                <p>Total Order Canceled</p>
                <span>123</span>
              </div>
            </div>
            <div className="status-item">
              <FaQuestionCircle />
              <div>
                <p>Order Pending</p>
                <span>432</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

   </>  );
};

export default HomePage;
