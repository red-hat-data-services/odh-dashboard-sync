import * as React from 'react';
import {
  Button,
  Card,
  CardBody,
  Flex,
  FlexItem,
  Stack,
  StackItem,
  Text,
  TextContent,
} from '@patternfly/react-core';
import { ArrowRightIcon } from '@patternfly/react-icons';
import getStartedImage from '~/images/AI_ML-illustration-Blog-thumbnail.svg';

type EmptyProjectsCardProps = {
  allowCreate: boolean;
  onCreateProject: () => void;
};

const EmptyProjectsCard: React.FC<EmptyProjectsCardProps> = ({ allowCreate, onCreateProject }) => (
  <Card data-testid="landing-page-projects-empty">
    <CardBody>
      <Flex
        gap={{ default: 'gapLg' }}
        alignItems={{ default: 'alignItemsCenter' }}
        flexWrap={{ default: 'wrap', sm: 'nowrap' }}
      >
        <FlexItem flex={{ default: 'flexNone' }}>
          <img src={getStartedImage} alt="" style={{ width: 320 }} />
        </FlexItem>
        <FlexItem>
          <Stack hasGutter>
            <StackItem>
              <TextContent>
                <Text component="h1">Start by creating your project</Text>
                <Text component="p">
                  From workbenches to model servers, your data science project can be organized and
                  customized to meet your needs.
                  {!allowCreate ? ' To request a project, contact your administrator.' : null}
                </Text>
              </TextContent>
            </StackItem>
            {allowCreate ? (
              <StackItem>
                <Button
                  data-testid="create-project-button"
                  variant="primary"
                  icon={<ArrowRightIcon />}
                  iconPosition="right"
                  onClick={onCreateProject}
                >
                  Create a project
                </Button>
              </StackItem>
            ) : null}
          </Stack>
        </FlexItem>
      </Flex>
    </CardBody>
  </Card>
);

export default EmptyProjectsCard;
