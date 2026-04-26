import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function ProfileBuilderDeprecated() {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-redirect after 3 seconds
    const timer = setTimeout(() => {
      navigate(createPageUrl('BuilderV2'));
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh', 
      backgroundColor: '#0A0D14',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '500px',
        width: '100%',
        backgroundColor: '#121726',
        borderRadius: '12px',
        padding: '40px',
        textAlign: 'center',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          backgroundColor: 'rgba(251, 146, 60, 0.1)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px'
        }}>
          <AlertTriangle size={40} color="#fb923c" />
        </div>
        
        <h1 style={{ 
          fontSize: '24px', 
          fontWeight: '700', 
          color: '#ffffff', 
          marginBottom: '12px' 
        }}>
          Builder Deprecated
        </h1>
        
        <p style={{ 
          fontSize: '16px', 
          color: '#9CA3AF', 
          marginBottom: '8px',
          lineHeight: '1.6'
        }}>
          This builder version is no longer supported.
        </p>
        
        <p style={{ 
          fontSize: '14px', 
          color: '#6B7280', 
          marginBottom: '32px',
          lineHeight: '1.6'
        }}>
          Please use <strong style={{ color: '#4368D9' }}>BuilderV2</strong> for all page editing.
          You will be redirected automatically in 3 seconds...
        </p>
        
        <Button 
          onClick={() => navigate(createPageUrl('BuilderV2'))}
          className="w-full bg-[#4368D9] hover:bg-[#3a59b4] text-white"
          size="lg"
        >
          Go to BuilderV2 Now
        </Button>
      </div>
    </div>
  );
}