import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FormInput from '../components/FormInput';

const AddTransporter = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    address: '',
    city: '',
    state: '',
    pinCode: '',
    panNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    // Submit logic here
    navigate('/total-credit');
  };

  return (
    <div className="container">
      <Header title="Add Transporter" />
      
      <div style={{ margin: '20px 0', height: "80vh", overflowY: "scroll" }}>
        <h2>View Transporter List</h2>
        
        <FormInput 
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        
        <FormInput 
          label="Mobile"
          name="mobile"
          type="tel"
          value={formData.mobile}
          onChange={handleChange}
        />
        
        <FormInput 
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
        
        <FormInput 
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
        
        <FormInput 
          label="State"
          name="state"
          value={formData.state}
          onChange={handleChange}
        />
        
        <FormInput 
          label="Pin Code"
          name="pinCode"
          type="number"
          value={formData.pinCode}
          onChange={handleChange}
        />
        
        <FormInput 
          label="PAN Number"
          name="panNumber"
          value={formData.panNumber}
          onChange={handleChange}
        />
        
        <div style={{ margin: '15px 0' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
            List of Truck :
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <input 
              type="text" 
              placeholder="GJ" 
              style={{ width: '50px', padding: '8px' }}
            />
            <input 
              type="text" 
              placeholder="01" 
              style={{ width: '50px', padding: '8px' }}
            />
            <input 
              type="text" 
              placeholder="N" 
              style={{ width: '30px', padding: '8px' }}
            />
            <input 
              type="text" 
              placeholder="8571" 
              style={{ width: '80px', padding: '8px' }}
            />
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '10px', margin: '20px' }}>
          <button 
            onClick={() => navigate('/total-credit')}
            style={{ backgroundColor: '#f44336' }}
          >
            Cancel
          </button>
          <button onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AddTransporter;