#!/usr/bin/env node

/**
 * Frontend-Backend Connection Test Script
 * Tests connectivity to all backend microservices
 */

const axios = require('axios');

// Backend service URLs (from .env configuration)
const services = {
  'User Service': 'http://localhost:8001',
  'Seller Service': 'http://localhost:8002', 
  'Customer Service': 'http://localhost:8003',
  'Catalog Service': 'http://localhost:8004',
  'Admin Service': 'http://localhost:8005'
};

async function testService(name, url) {
  try {
    console.log(`🔍 Testing ${name}...`);
    
    // Test health endpoint
    const response = await axios.get(`${url}/health`, {
      timeout: 5000
    });
    
    if (response.status === 200) {
      console.log(`✅ ${name}: Connected successfully`);
      console.log(`   Status: ${response.data.status || 'OK'}`);
      console.log(`   Service: ${response.data.service || 'Unknown'}`);
      return true;
    } else {
      console.log(`⚠️  ${name}: Unexpected status ${response.status}`);
      return false;
    }
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.log(`❌ ${name}: Service not running (Connection refused)`);
    } else if (error.code === 'ETIMEDOUT') {
      console.log(`⏰ ${name}: Connection timeout`);
    } else {
      console.log(`❌ ${name}: ${error.message}`);
    }
    return false;
  }
}

async function testAllServices() {
  console.log('🚀 HyperLocal Marketplace - Frontend-Backend Connection Test\n');
  
  const results = [];
  
  for (const [name, url] of Object.entries(services)) {
    const success = await testService(name, url);
    results.push({ name, url, success });
    console.log(''); // Empty line for readability
  }
  
  // Summary
  console.log('📊 Connection Test Summary:');
  console.log('=' .repeat(50));
  
  const successful = results.filter(r => r.success).length;
  const total = results.length;
  
  results.forEach(({ name, url, success }) => {
    const status = success ? '✅' : '❌';
    console.log(`${status} ${name.padEnd(20)} ${url}`);
  });
  
  console.log('=' .repeat(50));
  console.log(`📈 Success Rate: ${successful}/${total} (${Math.round(successful/total*100)}%)`);
  
  if (successful === total) {
    console.log('🎉 All services are running! Frontend can connect to backend.');
    console.log('💡 You can now start the frontend with: npm start');
  } else {
    console.log('⚠️  Some services are not running. Please start them first:');
    console.log('');
    console.log('Backend Setup:');
    console.log('1. cd /path/to/hyperlocalbymanus');
    console.log('2. python run_service.py user_service &');
    console.log('3. python run_service.py seller_service &');
    console.log('4. python run_service.py customer_service &');
    console.log('5. python run_service.py catalog_service &');
    console.log('6. python run_service.py admin_service &');
    console.log('');
    console.log('Or use Docker:');
    console.log('docker-compose up -d');
  }
  
  console.log('\n📚 For detailed setup instructions, see ENVIRONMENT_SETUP.md');
}

// Run the test
testAllServices().catch(error => {
  console.error('❌ Test script failed:', error.message);
  process.exit(1);
});