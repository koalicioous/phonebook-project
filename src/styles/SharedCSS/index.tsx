import { css } from "@emotion/react";

export const pageContainerStyle = css`
  display: flex;
  min-height: 100vh; /* Equivalent to min-h-screen in Tailwind */
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const contentWrapperStyle = css`
  background-color: white;
  padding: 20px;
  width: 100%;
  height: 100%;
  max-width: 750px;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (max-width: 600px) {
    border-radius: 0;
    height: 100vh;
  }

  @media (min-width: 600px) {
    max-height: 90vh;
  }
`;

export const inputStyle = css`
  width: 100%;
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 0 10px;
  font-size: 15px;
  line-height: 1;
  color: #334155;
  box-shadow: 0 0 0 1px #9ca3af;
  height: 35px;
  &focus {
    box-shadow: 0 0 0 2px #6b7280;
  }
`;

export const numberUpdateButtonStyle = css`
  border: none;
  padding: 8px 8px;
  border-radius: 8px;
  background-color: #e2e8f0;
  font-size: 10px;
  font-weight: 600;
  color: #0f172a;
  cursor: pointer;
  &:hover {
    background-color: #cbd5e1;
  }
`;

export const saveButtonStyle = css`
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  background-color: #1e293b;
  font-size: 14px;
  font-weight: 600;
  color: #f8fafc;
  cursor: pointer;
  &:hover {
    background-color: #0f172a;
  }
`;

export const nameTittleStyle = css`
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 8px;
`;
