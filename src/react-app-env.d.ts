/// <reference types="react-scripts" />
declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: 'deployment' | 'production';
        REACT_APP_KAKAO_API_KEY: string;
    }
}