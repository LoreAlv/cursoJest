import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export const renderWithProvider = (ui) => {
    return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
};
