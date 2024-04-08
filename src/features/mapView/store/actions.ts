import { Maybe } from "@common/types";
import { createAction } from "@reduxjs/toolkit";
import { BoundingBox } from "react-native-maps";

export const setMapBoundingBox =
  createAction<Maybe<BoundingBox>>("setMapBoundingBox");

export const setActiveMarkerId =
  createAction<Maybe<string>>("setActiveMarkerId");
