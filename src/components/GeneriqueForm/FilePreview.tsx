import { Chip, Stack } from '@mui/joy';
import React from 'react';

type FilePreviewProps = {
    files: File[];
    onRemove: (index: number) => void;
};

const FilePreview: React.FC<FilePreviewProps> = ({ files, onRemove }) => {
    return (
        <Stack
            gap={1}
            direction="row"
            flexWrap="wrap"
            // justifyContent="space-between"
            alignItems="center"
        >
            {files.map((file, index) => {
                const url = URL.createObjectURL(file);
                const isImage = file.type.startsWith('image/');
                return (
                    <Stack key={index} style={{ position: 'relative', width: 120 }}>
                        {isImage ? (
                            <img
                                src={url}
                                alt={`preview-${index}`}
                                style={{
                                    width: '100%',
                                    height: 100,
                                    objectFit: 'cover',
                                    borderRadius: 8,
                                    border: '1px solid #ccc'
                                }}
                            />
                        ) : (
                            <Stack style={{
                                width: '100%',
                                height: 100,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#f0f0f0',
                                borderRadius: 8
                            }}>
                                <Chip>{file.name}</Chip>
                            </Stack>
                        )}
                        <button
                            type="button"
                            onClick={() => onRemove(index)}
                            style={{
                                position: 'absolute',
                                top: -8,
                                right: -8,
                                background: 'red',
                                color: 'white',
                                border: 'none',
                                borderRadius: '50%',
                                width: 24,
                                height: 24,
                                cursor: 'pointer'
                            }}
                            title="Supprimer"
                        >
                            &times;
                        </button>
                    </Stack>
                );
            })}
        </Stack>
    );
};

export default FilePreview;
