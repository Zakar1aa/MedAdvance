// app/upload-document.tsx
import { Stack } from 'expo-router';
import UploadDocumentScreen from '../screens/UploadDocumentScreen';

export default function UploadDocument() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <UploadDocumentScreen />
    </>
  );
}