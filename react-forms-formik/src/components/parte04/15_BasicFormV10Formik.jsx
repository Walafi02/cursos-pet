import React from 'react'
import { Formik, Form, useField } from 'formik'
import * as Yup from 'yup'

const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props)
    return (
        <div className='form-group'>
            <label htmlFor={props.id}>{label}</label>
            <input
                {...props}
                {...field} //onChange, onBlur e value
                className={meta.touched ?
                    (meta.error) ? 'form-control is-invalid' : 'form-control is-valid'
                    :
                    'form-control'}
            />
            {meta.touched && meta.error ?
                <div className='invalid-feedback'>{meta.error}</div> : null}

        </div>
    )
}

const MySelect = ({ label, ...props }) => {
    const [field, meta] = useField(props)
    return (
        <div className='form-group'>
            <label htmlFor={props.id}>{label}</label>
            <select
                {...props}
                {...field} //onChange, onBlur e value
                className={meta.touched ?
                    (meta.error) ? 'custom-select is-invalid' : 'custom-select is-valid'
                    :
                    'custom-select'}
            />
            {meta.touched && meta.error ?
                <div className='invalid-feedback'>{meta.error}</div> : null}
        </div>
    )
}

const MyRadioGroup = ({...props}) => {
    //console.log(props)
    const [, meta] = useField(props.name);
    const radiosJSX = props.radios.map(
        (myRadio, i) => {
            return (
                <td key={i}>
                    <MyRadio name={props.name} id={myRadio.id} value={myRadio.value}>
                        <span style={{marginLeft:'1px', marginRight:'5px'}}>{myRadio.label}</span>
                    </MyRadio>
                </td>
            )//JSX dos MyRadios
        }
    )//map

    return (
        <div className='form-group' >
            {props.label}
            <table style={{marginTop:'4%'}}>
                <tbody>
                    <tr>
                    {radiosJSX}
                    </tr>
                </tbody>
            </table>
            {meta.touched && meta.error ? (
                <div className="invalid-feedback d-block">{meta.error}</div>
            ) : null}
        </div>
    )

}

const MyRadio = ({ children, ...props }) => {
    const [field,] = useField({ ...props, type: 'radio' })
    return (
        <div className='form-check'>
            <input type='radio'
                {...props}
                {...field} //onChange, onBlur e value
                className='form-check-input' />
            <label className='form-check-label' htmlFor={props.id}>
                {children}
            </label>
        </div>
    )
}

const MyTextArea = ({ label, ...props }) => {
    const [field, meta] = useField(props)
    return (
        <div className='form-group'>
            <label htmlFor={props.id}>{label}</label>
            <textarea
                {...props}
                {...field} //onChange, onBlur e value
                className={meta.touched ?
                    (meta.error) ? 'form-control is-invalid' : 'form-control is-valid'
                    :
                    'form-control'}
            />
            {meta.touched && meta.error ?
                <div className='invalid-feedback'>{meta.error}</div> : null}
        </div>
    )
}

const MyCheckBox = ({ children, ...props }) => {
    const [field, meta] = useField({ ...props, type: 'checkbox' })
    return (
        <div className='form-group'>
            <div className='custom-control'>
                <input type='checkbox'
                    {...props}
                    {...field}
                    className={meta.touched ?
                        (meta.error) ? 'custom-control-input is-invalid' : 'custom-control-input is-valid'
                        :
                        'custom-control-input'}
                />
                <label className='custom-control-label' htmlFor={props.id}>
                    {children}
                </label>
                {meta.touched && meta.error ?
                    <div className='invalid-feedback'>{meta.error}</div> : null}
            </div>
        </div>
    )
}

export default () => {

    return (
        <Formik

            initialValues={
                {
                    firstName: '',
                    lastName: '',
                    email: '',
                    job: '', //select
                    lang: '', //radio
                    comment: '', //text area
                    agree: false //checkbox
                }
            }

            validationSchema={
                Yup.object(
                    {
                        firstName: Yup.string()
                            .max(15, 'Deve ter menos de 15 caracteres')
                            .required('Obrigatório'),
                        lastName: Yup.string()
                            .max(20, 'Deve ter menos de 20 caracteres')
                            .required('Obrigatório'),
                        email: Yup.string()
                            .email('E-mail inválido')
                            .required('Obrigatório'),
                        job: Yup.string()
                            .oneOf(
                                ['designer', 'developer', 'architect', 'other'],
                                'Tipo de emprego inválido'
                            )
                            .required('Obrigatório'),
                        comment: Yup.string()
                            .max(50, 'Deve ter menos de 50 caracteres')
                            .required('Obrigatório'),
                        agree: Yup.boolean()
                            .required('Obrigatório')
                            .oneOf([true], 'Você deve aceitar os termos e condições.'),
                        lang: Yup.string()
                            .required('Obrigatório')
                    }
                )
            }

            onSubmit={

                (values, { setSubmitting }) => {
                    //console.log('Teste')
                    setTimeout(
                        () => {
                            console.log(values.firstName)
                            console.log(values.lastName)
                            console.log(values.email)
                            console.log(values.job)
                            console.log(values.lang)
                            console.log(values.comment)
                            console.log(values.agree)
                            setSubmitting(false)
                        },
                        2000
                    )
                }
            }
        >
            {
                props => (
                    <div className='card'>
                        <div className='card-header'>Formulário 15 - Formik</div>
                        <div className='card-body'>
                            <Form>
                                <div className='form-row'>
                                    <div className='col-md-6'>
                                        <MyTextInput
                                            label='Nome'
                                            name='firstName'
                                            id='firstName'
                                            type='text'
                                            placeholder='Seu primeiro nome aqui'
                                        />
                                    </div>
                                    <div className='col-md-6'>
                                        <MyTextInput
                                            label='Sobrenome'
                                            name='lastName'
                                            id='lastName'
                                            type='text'
                                            placeholder='Seu sobrenome nome aqui'
                                        />
                                    </div>
                                </div>
                                <div className='form-row'>
                                    <div className='col-md-4'>
                                        <MyTextInput
                                            label='E-mail'
                                            name='email'
                                            id='email'
                                            type='email'
                                            placeholder='exemplo@dominio.com.br'
                                        />
                                    </div>
                                    <div className='col-md-4'>
                                        <MySelect label='Tipo de Emprego' name='job' id='job'>
                                            <option value=''>Selecione um emprego</option>
                                            <option value='designer'>Designer</option>
                                            <option value='developer'>Desenvolvedor</option>
                                            <option value='architect'>Arquiteto</option>
                                            <option value='other'>Outro</option>
                                        </MySelect>
                                    </div>
                                    <div className='col-md-4'>
                                        <MyRadioGroup
                                            name='lang' 
                                            label='Selecione a sua linguagem predileta'
                                            radios={
                                                [
                                                    { id: 'java', value: 'java', label: 'Java' },
                                                    { id: 'cplusplus', value: 'cplusplus', label: 'C++' },
                                                    { id: 'python', value: 'python', label: 'Python' }
                                                ]
                                            }
                                        />
                                    </div>
                                </div>
                                <div className='form-row'>
                                    <div className='col-md-12'>
                                        <MyTextArea
                                            label='Comentários'
                                            name='comment'
                                            id='comment'
                                            placeholder='Comente aqui...'
                                        />
                                    </div>
                                </div>
                                <div className='form-row'>
                                    <div className='col-md-12'>
                                        <MyCheckBox name='agree' id='agree'>
                                            Eu aceito os termos e condições.
                                </MyCheckBox>
                                    </div>
                                </div>
                                <div className='form-row'>
                                    <div className='col-md-12'>
                                        <button type='submit' className='btn btn-primary'
                                            disabled={props.isSubmitting ? true : false} >
                                            Submeter
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>

                )
            }

        </Formik>
    )



}