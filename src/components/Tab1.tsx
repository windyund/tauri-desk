import React, {useState, ChangeEvent} from 'react';
import {invoke} from '@tauri-apps/api/tauri';

interface Tab1Props {
    onUploadSuccess: (data: any) => void; // 回调函数，上传成功后执行，接收处理后的数据
}

const Tab1: React.FC<Tab1Props> = ({onUploadSuccess}) => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files && e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            alert('请选择要上传的文件');
            return;
        }

        try {
            // 将文件数据转换为字节序列
            const fileData = await readFileAsBytes(file);
            // 调用 handle_excel_upload 函数
            const response = await invoke('handle_excel_upload', {"file":Array.from(fileData)});

            console.log('上传成功:', response);
            onUploadSuccess(response); // 将处理后的数据传递给父组件

        } catch (error) {
            console.error('调用处理函数失败:', error);
            // 处理失败的逻辑，例如显示错误信息或提示用户重试
        }
    };
    // 将文件转换为字节序列的辅助函数
    const readFileAsBytes = (file: File): Promise<Uint8Array> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target && event.target.result instanceof ArrayBuffer) {
                    const arrayBuffer = event.target.result;
                    const bytes = new Uint8Array(arrayBuffer);
                    resolve(bytes);
                } else {
                    reject(new Error('无法读取文件'));
                }
            };
            reader.onerror = () => {
                reject(new Error('文件读取失败'));
            };
            reader.readAsArrayBuffer(file);
        });
    };

    return (
        <div>
            <h2>导入 Excel 数据</h2>
            <input type="file" onChange={handleFileChange}/>
            <button onClick={handleUpload}>上传</button>
        </div>
    );
};

export default Tab1;
