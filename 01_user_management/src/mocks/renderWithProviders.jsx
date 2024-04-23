import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";

export const queryClient = new QueryClient();

export const renderWithProvider = (ui, qclient) => {
    // if (qclient) queryClient = qclient;
    return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
};
