import { useDisclosure } from "@chakra-ui/core";
import React, { useContext } from "react";
import { createContext, useEffect, useState } from "react";

export const FavoritesContext = createContext(null);

const FAVORITE_LAUNCHES_KEY = "favorite-launches";
const FAVORITE_LAUNCH_PADS_KEY = "favorite-launch-pads";

export function FavoritesProvider({ children }) {
  const {
    isOpen: isFavoritesOpen,
    onClose: closeFavorites,
    onOpen: openFavorites,
  } = useDisclosure(false);
  const [launches, setLaunches] = usePersistentState(FAVORITE_LAUNCHES_KEY, []);
  const [launchPads, setLaunchPads] = usePersistentState(
    FAVORITE_LAUNCH_PADS_KEY,
    []
  );

  function isLaunchInFavorites(launch) {
    return (
      launches.findIndex(
        (item) => item.flight_number === launch.flight_number
      ) !== -1
    );
  }

  function toggleLaunchToFavorites(launch) {
    if (isLaunchInFavorites(launch)) {
      setLaunches(
        launches.filter((item) => item.flight_number !== launch.flight_number)
      );
    } else {
      setLaunches([launch, ...launches]);
    }
  }

  function clearLaunchesFromFavorites() {
    setLaunches([]);
  }

  function isLaunchPadInFavorites(launchPad) {
    return (
      launchPads.findIndex((item) => item.site_id === launchPad.site_id) !== -1
    );
  }

  function toggleLaunchPadToFavorites(launchPad) {
    if (isLaunchPadInFavorites(launchPad)) {
      setLaunchPads(
        launchPads.filter((item) => item.site_id !== launchPad.site_id)
      );
    } else {
      setLaunchPads([launchPad, ...launchPads]);
    }
  }

  function clearLaunchPadsFromFavorites() {
    setLaunchPads([]);
  }

  return (
    <FavoritesContext.Provider
      value={{
        isFavoritesOpen,
        closeFavorites,
        openFavorites,
        launches,
        isLaunchInFavorites,
        clearLaunchesFromFavorites,
        launchPads,
        toggleLaunchToFavorites,
        isLaunchPadInFavorites,
        toggleLaunchPadToFavorites,
        clearLaunchPadsFromFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function usePersistentState(key, defaultValue) {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem(key);
    const initialValue = JSON.parse(savedData) ?? defaultValue;
    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data));
  }, [data, key]);

  return [data, setData];
}

export function useFavorites() {
  const {
    launches,
    clearLaunchesFromFavorites,
    isLaunchInFavorites,
    toggleLaunchToFavorites,
    launchPads,
    isLaunchPadInFavorites,
    toggleLaunchPadToFavorites,
    clearLaunchPadsFromFavorites,
  } = useContext(FavoritesContext);

  return {
    launches,
    clearLaunchesFromFavorites,
    isLaunchInFavorites,
    toggleLaunchToFavorites,
    launchPads,
    isLaunchPadInFavorites,
    toggleLaunchPadToFavorites,
    clearLaunchPadsFromFavorites,
  };
}

export function useFavoritesDrawer() {
  const { isFavoritesOpen, closeFavorites, openFavorites } =
    useContext(FavoritesContext);

  return {
    isFavoritesOpen,
    closeFavorites,
    openFavorites,
  };
}
