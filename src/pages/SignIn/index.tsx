import React, { useCallback, useRef } from 'react';
import {
    Image,
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    TextInput,
    Alert
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import {useAuth} from '../../hooks/auth'

import getValidationErrors from '../../utils/getValidationErrors'


import logoImg from '../../assets/logo.png';
import Button from '../../components/Button'
import Input from '../../components/Input'
import Icon from 'react-native-vector-icons/Feather'

import {
    Container,
    Title,
    ForgotPassword,
    ForgotPasswordText,
    CreateAccountButton,
    CreateAccountButtonText
} from './styles';

interface SignInFormData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const passwordInputRef = useRef<TextInput>(null);
    const navigation = useNavigation();
    const {signIn} = useAuth();

    const handleSignIn = useCallback(
        async (data: SignInFormData) => {
            try {
                formRef.current?.setErrors({})
                const schema = Yup.object().shape({
                    email: Yup.string()
                        .required('Email obrigatório')
                        .email('Digite um email valido.'),
                    password: Yup.string().required('Senha obrigatória'),
                });

                await schema.validate(data, { abortEarly: false });

                await signIn({
                  email: data.email,
                  password: data.password
                });
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err)
                    formRef.current?.setErrors(errors)
                    return;
                }

                Alert.alert('Erro de autenticação',
                    'Usuario ou senha incorreto')      
            }
        }, []);


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
                            <Title>Faça seu logon</Title>
                        </View>

                        <Form ref={formRef} onSubmit={handleSignIn}>
                            <Input
                                autoCorrect={false}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                name="email"
                                icon="mail"
                                placeholder="Email"
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    passwordInputRef.current?.focus();
                                }}
                            />

                            <Input
                                ref={passwordInputRef}
                                name="password"
                                icon="lock"
                                placeholder="Senha"
                                secureTextEntry
                                returnKeyType="send"
                                onSubmitEditing={() => {
                                    formRef.current?.submitForm();
                                }} />

                        </Form>

                        <Button
                            onPress={() => {
                                formRef.current?.submitForm();
                            }}>
                            Entrar
                        </Button>


                        <ForgotPassword onPress={() => { }}>
                            <ForgotPasswordText>
                                Esqueci minha senha
                                </ForgotPasswordText>
                        </ForgotPassword>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>


            <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
                <CreateAccountButtonText>
                    <Icon name="log-in" size={20} color="#ff9000" > </Icon>
                    Criar uma conta
                </CreateAccountButtonText>
            </CreateAccountButton>
        </>
    )
}

export default SignIn;