export const ErrorMessage = ({ error, emails }) => {
  const getErrorMessage = (error) => {
    const mapping = {
      server_error: 'Unknown server error',
      invalid_request_body: 'Invalid request body',
      invalid_email_address:
        'Correctness of these email addresses needs to be checked',
      send_failure: 'Failed to send emails to some addresses',
    };
    return mapping[error] ?? '';
  };

  return (
    <div>
      <p>
        {['There was an error', getErrorMessage(error)]
          .filter(Boolean)
          .join(': ')}
      </p>
      {emails?.length > 0 && (
        <ul>
          {emails.map((email) => (
            <li key={email}>{email}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
