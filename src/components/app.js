import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/core";
import Launches, { LaunchItem } from "./launches";
import Launch from "./launch";
import Home from "./home";
import LaunchPads, { LaunchPadItem } from "./launch-pads";
import LaunchPad from "./launch-pad";
import { useFavorites, useFavoritesDrawer } from "../contexts/favorites";

export default function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/launches" element={<Launches />} />
        <Route path="/launches/:launchId" element={<Launch />} />
        <Route path="/launch-pads" element={<LaunchPads />} />
        <Route path="/launch-pads/:launchPadId" element={<LaunchPad />} />
      </Routes>
      <FavoritesDrawer />
    </div>
  );
}

function FavoritesDrawer() {
  const { isFavoritesOpen, closeFavorites } = useFavoritesDrawer();
  const {
    launches,
    clearLaunchesFromFavorites,
    launchPads,
    clearLaunchPadsFromFavorites,
  } = useFavorites();
  return (
    <Drawer isOpen={isFavoritesOpen} size="lg" onClose={closeFavorites}>
      <DrawerOverlay />
      <DrawerContent overflow="auto">
        <DrawerHeader>Favorites</DrawerHeader>
        <DrawerBody>
          <Tabs isFitted variant="enclosed-colored">
            <TabList mb={2}>
              <Tab fontWeight="bold">Launches ({launches.length})</Tab>
              <Tab fontWeight="bold">Launch Pads ({launchPads.length})</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {launches.length > 0 && (
                  <Button
                    onClick={clearLaunchesFromFavorites}
                    variant="outline"
                    variantColor="red"
                    mb={2}
                  >
                    Clear all launches
                  </Button>
                )}
                {launches.length === 0 && (
                  <Text fontWeight="bold">
                    You don't have any favorite launches
                  </Text>
                )}
                <SimpleGrid spacing={4} mb={4}>
                  {launches.map((launch) => (
                    <LaunchItem launch={launch} key={launch.flight_number} />
                  ))}
                </SimpleGrid>
              </TabPanel>
              <TabPanel>
                {launchPads.length > 0 && (
                  <Button
                    onClick={clearLaunchPadsFromFavorites}
                    variant="outline"
                    variantColor="red"
                    mb={2}
                  >
                    Clear all Launch Pads
                  </Button>
                )}
                {launchPads.length === 0 && (
                  <Text fontWeight="bold">
                    You don't have any favorite launch pads
                  </Text>
                )}
                <SimpleGrid spacing={4}>
                  {launchPads.map((launchPad) => (
                    <LaunchPadItem
                      launchPad={launchPad}
                      key={launchPad.site_id}
                    />
                  ))}
                </SimpleGrid>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

function NavBar() {
  const { openFavorites } = useFavoritesDrawer();
  const { launches, launchPads } = useFavorites();
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="6"
      bg="gray.800"
      color="white"
    >
      <Text
        fontFamily="mono"
        letterSpacing="2px"
        fontWeight="bold"
        fontSize="lg"
      >
        ¡SPACE·R0CKETS!
      </Text>
      <Button color="black" onClick={openFavorites}>
        Open Favorites ({launches.length + launchPads.length})
      </Button>
    </Flex>
  );
}
