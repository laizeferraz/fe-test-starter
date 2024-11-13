import { Controller, SubmitHandler, useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Image, Box, Button, Container, FormControl, FormErrorMessage, FormLabel, HStack, Input, InputGroup, InputLeftAddon, NumberInput, NumberInputField, Radio, RadioGroup, Center, useColorModeValue, useColorMode } from "@chakra-ui/react"

import { formSchema } from './schema'
import { z } from 'zod'

type FormData = z.infer<typeof formSchema>;

export const Form = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { handleSubmit, register, formState: { errors, isSubmitting }, control } = useForm<FormData>({
    resolver: zodResolver(formSchema), defaultValues: {
      price: {
        type: 'range',
        amount: {
          min: 0,
          max: 0
        }
      }
    },
  })



  // The callback to use when the form is submitted
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data)
  }

  // Watch the selected priceType to conditionally render fields
  const priceType = useWatch({
    control,
    name: 'price.type'

  });

  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('black', 'white');

  return (
    <Box display="grid" placeItems="center" height="100vh">
      <Container bg={bgColor} color={textColor} p={8} boxShadow="lg" borderRadius="md">
        <Center mb={10}>
          <Image src="./public/ignition-logo-dark.svg" alt="logo" />
        </Center>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name Field */}
          <FormControl isInvalid={!!errors.name} mb={4}>
            <FormLabel htmlFor='name'>Name</FormLabel>
            <Input
              data-testid="name"
              id='name'
              placeholder="name"
              type='text'
              {...register('name')}
            />
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </FormControl>
          {/* Email Field */}
          <FormControl isInvalid={!!errors.email} mb={4}>
            <FormLabel htmlFor='email'>Email</FormLabel>
            <Input
              id='email'
              placeholder="email"
              {...register('email')}
              data-testid="email"
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>
          {/* Pricing Type Radio Field */}
          <FormControl mb={4}>
            <FormLabel>Price Type</FormLabel>
            <Controller
              name="price.type"
              control={control}
              render={({ field }) => (
                <RadioGroup defaultValue='range' {...field}>
                  <HStack direction="row">
                    <Radio data-testid="fixed-type" value="fixed">Fixed</Radio>
                    <Radio data-testid="range-type" value="range">Range</Radio>
                  </HStack>
                </RadioGroup>
              )}
            />
          </FormControl>
          {priceType === 'fixed' && (
            <FormControl isInvalid={!!errors.price?.amount} mb={4}>
              <FormLabel>Fixed Price</FormLabel>
              <InputGroup>
                <InputLeftAddon>$</InputLeftAddon>
                <Controller
                  name="price.amount"
                  control={control}
                  render={({ field }) => (
                    <NumberInput min={0}
                      onChange={(valueString) => field.onChange(Number(valueString))}>
                      <NumberInputField data-testid="fixed-amount" placeholder="Enter fixed price" />
                    </NumberInput>
                  )}
                />
              </InputGroup>
              <FormErrorMessage>{errors.price?.amount?.message}</FormErrorMessage>
            </FormControl>
          )}

          {/* Min Price Field */}
          {priceType === 'range' && (
            <HStack spacing={4} mb={4}>
              {/* Min Price Field */}
              <FormControl isInvalid={!!errors.price?.amount} flex="1">
                <FormLabel>Min Price</FormLabel>
                <InputGroup>
                  <InputLeftAddon>$</InputLeftAddon>
                  <Controller
                    name="price.amount.min"
                    control={control}
                    render={({ field }) => (
                      <NumberInput min={0}
                        onChange={(valueString) => field.onChange(Number(valueString))}>
                        <NumberInputField data-testid="min-amount" placeholder="Enter min price" />
                      </NumberInput>
                    )}
                  />
                </InputGroup>
                <FormErrorMessage>{!!errors.price?.amount}</FormErrorMessage>
              </FormControl>

              {/* Max Price Field */}
              <FormControl isInvalid={!!errors.price?.amount} flex="1">
                <FormLabel>Max Price</FormLabel>
                <InputGroup>
                  <InputLeftAddon>$</InputLeftAddon>
                  <Controller
                    name="price.amount.max"
                    control={control}
                    render={({ field }) => (
                      <NumberInput min={1}
                        onChange={(valueString) => field.onChange(Number(valueString))} >
                        <NumberInputField data-testid="max-amount" placeholder="Enter max price" />
                      </NumberInput>
                    )}
                  />
                </InputGroup>
                <FormErrorMessage>{errors.price?.amount?.message}</FormErrorMessage>
              </FormControl>
            </HStack>
          )}

          <Button disabled={isSubmitting} data-testid="submit-button" mt={4} colorScheme="blue" type="submit" w='full'>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </form>
      </Container>
      <Button onClick={toggleColorMode} mb={4}>
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'} Mode
      </Button>
    </Box>
  );
}
