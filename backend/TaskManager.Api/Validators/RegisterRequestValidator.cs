using FluentValidation;
using TaskManager.Api.Dtos.Auth;

namespace TaskManager.Api.Validators
{
    public class RegisterRequestValidator : AbstractValidator<RegisterRequest>
    {
        public RegisterRequestValidator()
        {
            RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email is required")
            .EmailAddress().WithMessage("Invalid email format");

            RuleFor(x => x.Password)
            .NotEmpty().WithMessage("Password is required")
            .MinimumLength(6).WithMessage("Password must be at least 6 characters long");

            RuleFor(x => x.FullName)
            .NotEmpty().WithMessage("FullName is required")
            .WithMessage("FullName is required");
        }
    }
}