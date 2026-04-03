using FluentValidation;
using TaskManager.Api.Dtos.Auth;

namespace TaskManager.Api.Validators
{
    public class LogInValidator : AbstractValidator<LogInRequest>
    {
        public LogInValidator()
        {
            RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email is required")
            .EmailAddress().WithMessage("Invalid email format");

            RuleFor(x => x.Password)
            .NotEmpty().WithMessage("Password is required");
        }
    }
}