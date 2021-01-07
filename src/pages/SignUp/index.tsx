import React, { useRef, useCallback } from 'react';
// import {Link} from 'react-router-dom';
import {
    Image,
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    TextInput,
    Alert
} from 'react-native';

import * as Yup from 'yup'

import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile'

import getValidationErrors from '../../utils/getValidationErrors'

import logoImg from '../../assets/logo.png';
import Button from '../../components/Button'
import Input from '../../components/Input'
import Icon from 'react-native-vector-icons/Feather'
import { FormHandles } from '@unform/core';
import api from '../../services/api'


import {
    Container,
    Title,
    BackToSignIn,
    BackToSignInText
} from './styles';

interface SignUpFormData {
    name: string;
    email: string;
    password: string;
}

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const navigation = useNavigation();
    const emailInputRef = useRef<TextInput>(null);
    const passwordInputRef = useRef<TextInput>(null);


    const handleSignUp = useCallback(async (data: SignUpFormData) => {
        try {
            formRef.current?.setErrors({})

            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string()
                    .required('Email obrigatório')
                    .email('Digite um email valido.'),
                password: Yup.string().min(6, 'Senha minima 6 caracteres'),
            });


            await schema.validate(data, { abortEarly: false });

            await api.post('/users', data)
            Alert.alert('Cadastro realizado com sucesso!', 'Faça login no App!')
            navigation.goBack();


        } catch (err) {

            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err)
                formRef.current?.setErrors(errors)

                return;
            }
            Alert.alert('Erro no cadastro',
                'Ocorreu um erro ao realizar o cadastro, tente novamente.')
        }
    }, [navigation]);        
        


    return (

        <>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                enabled
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ flex: 1 }}
                >
                    <Container >
                        <Image source={logoImg} />
                        <View>
                            <Title>Crie sua conta</Title>
                        </View>
                        <Form ref={formRef} onSubmit={handleSignUp}>

                            <Input
                                autoCapitalize="words"
                                name="name"
                                returnKeyType="next"
                                icon="user"
                                placeholder="Nome"
                                onSubmitEditing={() => {
                                    emailInputRef.current?.focus();
                                }}

                            />

                            <Input
                                ref={emailInputRef}
                                autoCapitalize="none"
                                autoCorrect={false}
                                name="email"
                                keyboardType="email-address"
                                icon="mail"
                                placeholder="Email"
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    passwordInputRef.current?.focus();
                                }}
                            />

                            <Input
                                ref={passwordInputRef}
                                secureTextEntry
                                name="password"
                                icon="lock"
                                placeholder="Senha"
                                returnKeyType="send"
                                textContentType="newPassword"
                                onSubmitEditing={() => {
                                    formRef.current?.submitForm();
                                }}
                            />

                        </Form>

                        <Button
                            onPress={() => formRef.current?.submitForm()}>
                            Cadastrar
                        </Button>

                        <BackToSignIn onPress={() => navigation.navigate('SignIn')}>
                            <BackToSignInText>
                                <Icon name="arrow-left" size={20} color="#fff" > </Icon>
                               Voltar para logon
                            </BackToSignInText>
                        </BackToSignIn>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
        </>
    )
}
export default SignUp;