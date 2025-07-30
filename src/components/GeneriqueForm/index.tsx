import {
    Button, ButtonGroup, Card, Divider, FormControl, FormLabel,
    Grid, Input, Option, Select, Stack, Textarea
} from '@mui/joy';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import FilePreview from './FilePreview';

export type FormField = {
    name: string;
    label: string;
    type: 'text' | 'password' | 'email' | 'number' | 'select' | 'textarea' | 'date' | 'datetime-local' | 'file'; // Ajout de 'file'
    required?: boolean;
    placeholder?: string;
    defaultValue?: string;
    startDecorator?: React.ReactNode;
    options?: { value: string | number; label: string }[];
    conditionalRender?: {
        field: string;
        value: string | number;
    };
    readOnly?: boolean;
    xs?: number;
    sm?: number;
    multiple?: boolean; // Pour fichier multiple
};

export type GenericFormProps<T extends Record<string, any>> = {
    fields: FormField[];
    treatmentFonction: (data: T | FormData) => Promise<boolean | any>;
    initialData?: T;
    onSubmitSuccess?: (data?: any) => any;
    onCancel?: () => void;
    submitButtonText?: string;
    cancelButtonText?: string;
    loadingStateText?: string;
};

const GenericForm = <T extends Record<string, any>>({
    fields,
    treatmentFonction,
    initialData,
    onSubmitSuccess,
    onCancel,
    submitButtonText = "Enregistrer",
    cancelButtonText = "Annuler",
    loadingStateText = "En cours de chargement."
}: GenericFormProps<T>) => {
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState<T>(() => {
        if (initialData) {
            return initialData;
        }
        const initial: Record<string, any> = {};
        fields.forEach(field => {
            if (field.defaultValue !== undefined) {
                initial[field.name] = field.defaultValue;
            }
        });
        return initial as T;
    });

    useEffect(() => {
        if (initialData) {
            setFormValues(initialData);
        } else {
            const initial: Record<string, any> = {};
            fields.forEach(field => {
                if (field.defaultValue !== undefined) {
                    initial[field.name] = field.defaultValue;
                }
            });
            setFormValues(initial as T);
        }
    }, [initialData, fields]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        if (e.target.type === 'file') {
            const files = (e.target as HTMLInputElement).files;
            const field = fields.find(f => f.name === name);
            if (files && field) {
                const fileList = Array.from(files);
                setFormValues(prev => ({
                    ...prev,
                    [name]: [...(field.multiple ? prev[name] || [] : []), ...fileList]
                }));
            }
        } else {
            setFormValues(prev => ({
                ...prev,
                [name]: e.target.value
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Vérifie si le formulaire contient un champ fichier
            const hasFile = fields.some(f => f.type === 'file');
            let dataToSend: any = formValues;

            if (hasFile) {
                const formData = new FormData();
                for (const key in formValues) {
                    const value = formValues[key];

                    //@ts-ignore
                    if (value instanceof File) {
                        formData.append(key, value);
                    } else if (Array.isArray(value) && value.every((v: any) => v instanceof File)) {
                        value.forEach((file: any) => formData.append(key, file));
                    } else {
                        formData.append(key, value);
                    }
                }
                dataToSend = formData;
            }

            const result = await treatmentFonction(dataToSend);
            if (!result) {
                toast.error("Erreur lors de la soumission du formulaire.");
                return;
            }

            toast.success("Opération réussie !");
            onSubmitSuccess && onSubmitSuccess(result);
        } catch (error) {
            console.error("Erreur lors de la soumission du formulaire:", error);
            toast.error("Une erreur s'est produite lors de la soumission du formulaire.");
        } finally {
            setLoading(false);
        }
    };

    const renderField = (field: FormField) => {
        const commonProps = {
            name: field.name,
            placeholder: field.placeholder,
            required: field.required,
            startDecorator: field.startDecorator,
            readOnly: field.readOnly,
            onChange: (e: any) => handleChange(e, field.name),
        };

        switch (field.type) {
            case 'text':
            case 'password':
            case 'email':
            case 'date':
            case 'datetime-local':
            case 'number':
                return <Input type={field.type} {...commonProps} value={formValues[field.name] ?? ''} />;
            case 'select':
                return (
                    <Select
                        {...commonProps}
                        onChange={(e, value) => handleChange({ target: { value } } as any, field.name)}
                        value={formValues[field.name] ?? ''}
                    >
                        {field.options && field.options.map((option, idx) => (
                            <Option key={idx} value={option.value}>{option.label}</Option>
                        ))}
                    </Select>
                );
            case 'textarea':
                return <Textarea minRows={3} {...commonProps} value={formValues[field.name] ?? ''} />;
            case 'file': {
                const currentFiles: File[] = formValues[field.name] || [];

                return (
                    <Card sx={{ gap: 1, p: 0.5 }}>
                        <Input
                            type="file"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, field.name)}
                            slotProps={{ input: { multiple: field.multiple } }}
                        />
                        {currentFiles.length > 0 && (
                            <FilePreview
                                files={currentFiles}
                                onRemove={(index) => {
                                    const updated = currentFiles.filter((_, i) => i !== index);
                                    setFormValues((prev) => ({
                                        ...prev,
                                        [field.name]: updated,
                                    }));
                                }}
                            />
                        )}
                    </Card>
                );
            }
            default:
                return null;
        }
    };

    return (
        <Stack
            component='form'
            onSubmit={handleSubmit}
            gap={2}
            encType="multipart/form-data" // ajout ici
        >
            <Grid container spacing={2} sx={{ overflowY: 'auto', mx: -1 }}>
                {fields.map((field, index) => {
                    const shouldRender = field.conditionalRender
                        ? formValues[field.conditionalRender.field] === field.conditionalRender.value
                        : true;

                    return shouldRender && (
                        <Grid xs={field.xs || 12} sm={field.sm || 12} key={field.name || index}>
                            <FormControl required={field.required}>
                                <FormLabel>{field.label}</FormLabel>
                                {renderField(field)}
                            </FormControl>
                        </Grid>
                    );
                })}
            </Grid>

            <Divider />

            <ButtonGroup>
                <Button
                    fullWidth
                    variant='solid'
                    color='primary'
                    type='submit'
                    startDecorator={<FontAwesomeIcon icon={faPaperPlane} />}
                    loading={loading}
                >
                    {loading ? loadingStateText : submitButtonText}
                </Button>
                <Button
                    variant='soft'
                    color='danger'
                    onClick={onCancel}
                    endDecorator={<FontAwesomeIcon icon={faTimesCircle} />}
                >
                    {cancelButtonText}
                </Button>
            </ButtonGroup>
        </Stack>
    );
};

export default GenericForm;
