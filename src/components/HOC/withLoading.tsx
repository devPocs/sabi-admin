import React from "react";
import Spinner from "@components/spinner";
import { Box } from "@chakra-ui/react";

interface WithLoadingProps {
  loading: boolean;
}

const withLoading = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  // Return a new component
  const HOC: React.FC<P & WithLoadingProps> = ({ loading, ...props }) => {
    return (
      <>
        {loading && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              zIndex: 1000,
            }}
          >
            <Spinner />
          </Box>
        )}
        <WrappedComponent {...(props as P)} />;
      </>
    );
  };

  HOC.displayName = `WithLoading(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return HOC;
};

export default withLoading;
