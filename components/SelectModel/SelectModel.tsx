import React from "react";
import { useField, useFormikContext } from "formik";
import { InputLabel, MenuItem, FormHelperText, FormControl, Select } from '@material-ui/core';
import { ModelType } from "../../lib/getModels";
import useSWR from "swr";

interface SelectModelType {
    name: string;
    lapModels: ModelType[];
    brand: string;
}

export default function SelectModel({ lapModels, brand, ...props }: SelectModelType) {

    const { setFieldValue } = useFormikContext();
    const [field] = useField({
        name: props.name
    });

    //console.log('Formik filed: ', field)
    const { data } = useSWR<ModelType[]>(`/api/models/?brand=${brand}`, {
        dedupingInterval: 60000,
        onSuccess: (newData) => {
            if (!selectedModels.map(el => el.model).includes(field.value)) {
                setFieldValue('model', 'all');
            }
        }
    });
    const selectedModels = data || lapModels;
    
    return (
        <FormControl fullWidth variant="outlined" >
            <InputLabel id="search-model">Models</InputLabel>
            <Select
                name='model'
                labelId="search-model"
                label="Models"
                {...field}
                {...props}
            >
                <MenuItem value='all'>
                    <em>All models</em>
                </MenuItem>
                {selectedModels.map((model: ModelType) => {
                    return (
                        <MenuItem key={model.model} value={model.model}>
                            {`${model.model} (${model.count})`}
                        </MenuItem>
                    )
                })}
            </Select>
        </FormControl>
    )
}