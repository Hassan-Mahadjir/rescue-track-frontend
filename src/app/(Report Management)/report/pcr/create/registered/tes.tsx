// MultiStepForm.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Summary from "./Summary";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
    setValue,
    getValues,
    trigger,
  } = useForm({
    defaultValues: {
      selectedOption: "",
      multipleSelections: [],
      radioSelection: "",
      checkboxOptions: [],
      dropdownSelection: "",
    },
  });

  const nextStep = async () => {
    // Trigger validation before proceeding to next step
    const isValid = await trigger();
    if (isValid) {
      setStep(step + 1);
    }
  };

  const prevStep = () => setStep(step - 1);

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    alert("Form submitted successfully!");
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1 register={register} errors={errors} nextStep={nextStep} />
        );
      case 2:
        return (
          <Step2
            register={register}
            control={control}
            setValue={setValue}
            watch={watch}
            errors={errors}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 3:
        return (
          <Step3
            register={register}
            errors={errors}
            nextStep={nextStep}
            prevStep={prevStep}
            watch={watch}
          />
        );
      case 4:
        return (
          <Summary
            formData={getValues()}
            prevStep={prevStep}
            onSubmit={handleSubmit(onSubmit)}
          />
        );
      default:
        return (
          <Step1 register={register} errors={errors} nextStep={nextStep} />
        );
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Multi-Step Form</h1>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between">
          {[1, 2, 3, 4].map((stepNumber) => (
            <div key={stepNumber} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center 
                  ${
                    step >= stepNumber
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
              >
                {stepNumber}
              </div>
              <span className="text-xs mt-1">
                {stepNumber === 1 && "Options"}
                {stepNumber === 2 && "Selections"}
                {stepNumber === 3 && "Details"}
                {stepNumber === 4 && "Review"}
              </span>
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 h-1 mt-2">
          <div
            className="bg-blue-500 h-1 transition-all duration-300"
            style={{ width: `${(step - 1) * 33.33}%` }}
          ></div>
        </div>
      </div>

      {/* Current Step Content */}
      {renderStep()}
    </div>
  );
};

export default MultiStepForm;
