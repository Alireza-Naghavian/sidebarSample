/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { ChildrenProp } from '@/_types/global.t';
import React, { ChangeEvent, createContext, useContext, useEffect, useRef, useState } from 'react';

type initialState = {
  file: File | null;
  previewUrl: string | null;
  uploadProgress: number;
  isUploadStart: boolean;
  submitUpload: (data: any) => Promise<unknown>;
  handleSelectedFile?: (e: ChangeEvent<HTMLInputElement>) => void;
  handleCancelMediaUpload?: VoidFunction;
}; 

const ititialUploadState: initialState = {
  file: null,
  previewUrl: null,
  uploadProgress: 0,
  isUploadStart: false,
  submitUpload: async (data: any) => {},
  handleCancelMediaUpload: () => {},
  handleSelectedFile: (e: ChangeEvent<HTMLInputElement>) => {},
};

export const UploadMediaContext = createContext<initialState>(ititialUploadState);

const UploadMediaProvider = ({ children }: ChildrenProp) => {
  // states
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  // temprorary states
  const [isUploadStart, setIsUploadStart] = useState(false);
  const cancelUploadRef = useRef<AbortController | null>(null);
 

  //  set media preview
  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [file]);

  // handlers
  const submitUpload = async () => {
    if (!file) return;
    setFile(file);
    setIsUploadStart(true);
    setUploadProgress(0);

    // request progresss
    const controller = new AbortController();

    cancelUploadRef.current = controller;

    setIsUploadStart(true);
    const mockUploadHandler = async () => {
      const data = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 2000);
      });

      if (data) {
        const timer = setInterval(() => {
          setUploadProgress((prev) => {
            if (prev >= 100) {
              clearInterval(timer);
              // When upload complete
              setFile(null);
              setPreviewUrl(null);
              setIsUploadStart(false);
              return 0;
            }
            return prev + 10;
          });
        }, 800);
      }
    };

    mockUploadHandler();
  };

  const handleSelectedFile = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };


  const handleCancelMediaUpload = () => {
    if (cancelUploadRef.current) {
      cancelUploadRef.current.abort();
    }
    setIsUploadStart(false);
    setPreviewUrl(null);
    setUploadProgress(0);
    setFile(null);
  };


  const values: initialState = {
    handleCancelMediaUpload,
    handleSelectedFile,
    submitUpload,
    file,
    isUploadStart,
    previewUrl,
    uploadProgress,
  };
  return <UploadMediaContext.Provider value={values}>{children}</UploadMediaContext.Provider>;
};

export const useUploadMedia = () => {
  const uploadctx = useContext(UploadMediaContext);

  if (!uploadctx) throw new Error('use upload context inside of own provider');

  return uploadctx;
};

export default UploadMediaProvider;
