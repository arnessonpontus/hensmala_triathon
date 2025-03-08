import React from "react";
import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: 200px 0; }
`;

interface SkeletonProps {
  width?: string;
  height?: string;
  radius?: string;
}

const BaseSkeleton = styled.div<SkeletonProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: ${(props) => props.radius};
`;

export const ImageSkeleton: React.FC<SkeletonProps> = ({ width = "100%", height = "200px", radius = "8px" }) => {
  return <BaseSkeleton width={width} height={height} radius={radius} />;
};

export const TextSkeleton: React.FC<SkeletonProps> = ({ width = "40px", height = "16px", radius = "4px" }) => {
  return <BaseSkeleton width={width} height={height} radius={radius} style={{ marginBottom: "8px" }} />;
};
