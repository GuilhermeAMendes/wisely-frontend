// Types
import useSWR from "swr";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { completeTopic, getTopics, Topic } from "@services/topic";
import { ActionTypes, NodeTopic } from "@pages/TopicsList/types";

import { useRef } from "react";
import { ConfirmRemoveModalMethods } from "@pages/TopicsList/modals/ConfirmRemoveModal/types";
import { ManageTopicModalMethods } from "@pages/TopicsList/modals/ManageTopicModal/types";
import { launchPinkConfetti } from "./utils/confetti";
import { increaseProgress } from "@services/progress";
import { CompleteJourney } from "@services/journey";
import { sprinklePinkJoy } from "@utils/confetti";

export function useTopicsList() {
  // Refs
  const modalRef = useRef<ManageTopicModalMethods>(null);
  const removeModalRef = useRef<ConfirmRemoveModalMethods>(null);

  // Hooks
  const { query, push, replace } = useRouter();

  // Constants
  const id = query.id as string;
  const journeyId = query["journey-id"] as string;
  const isCompletedJourney = query["is-completed"] as string;

  const { data, isLoading, mutate } = useSWR(
    `/journey/${journeyId}/topic`,
    fetchTopics,
    {
      revalidateOnFocus: false,
    }
  );

  // Functions
  function fetchTopics() {
    if (!journeyId) return;
    try {
      return getTopics({ journeyId });
    } catch (error) {
      console.log(error);
    }
  }

  async function completJourneyPatch() {
    if (!journeyId) return;

    try {
      await CompleteJourney({ journeyId });
      toast.success("Jornada completa");
      sprinklePinkJoy();
      mutate();

      replace(`/directories/${id}/journeys/${journeyId}/completed/true/topics`);
    } catch {
      toast.error("Erro ao completar jornada");
    }
  }

  async function handleCompletTopic(topic: Topic) {
    try {
      completeTopic({ topicId: topic.props.id });
      increaseProgress({ idJourney: journeyId });

      toast.success(`Topic is completed`);
      launchPinkConfetti();
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await mutate();
    } catch (error) {
      toast.error(`Topic is not completed because ${(error as Error).message}`);
    }
  }

  function openModal(topic?: Topic) {
    modalRef.current?.open(topic);
  }

  function openRemoveTopic(topic: Topic) {
    removeModalRef.current?.open(topic);
  }

  // Functions
  function handleClickNode(node: NodeTopic) {
    if (!id || !journeyId) return;

    push(
      `/directories/${id}/journeys/${journeyId}/completed/${isCompletedJourney}/topics/${node.id}/note`
    );
  }

  function parseTopicsToNodeTopic(): NodeTopic[] {
    if (!data) return [];

    return data.map((topic) => {
      const props = topic.props;

      return {
        id: props.id,
        idJourney: props.idJourney,
        topicName: props.topicName,
        createdAt: props.createdAt,
        updatedAt: props.updatedAt,
        completedAt: props.completedAt,
        isActive: props.isActive,
        isCompleted: props.isConcluded,
        label: props.topicName,
      };
    });
  }

  function parseNodeTopicToTopic(node: NodeTopic): Topic {
    const props = {
      id: node.id,
      idJourney: node.idJourney,
      topicName: node.topicName,
      createdAt: node.createdAt,
      updatedAt: node.updatedAt,
      completedAt: node.completedAt,
      isActive: node.isActive,
      isConcluded: node.isCompleted,
    };

    return { props };
  }

  function handleClickAction(action: ActionTypes, node: NodeTopic) {
    const topic = parseNodeTopicToTopic(node);
    switch (action) {
      case "conclude":
        return handleCompletTopic(topic);
      case "edit":
        openModal(topic);
        break;

      case "delete":
        openRemoveTopic(topic);
        break;
    }
  }

  return {
    removeModalRef,
    completJourneyPatch,
    modalRef,
    nodes: parseTopicsToNodeTopic(),
    topics: data,
    isLoading,
    mutate,
    handleClickNode,
    openModal,
    handleClickAction,
    openRemoveTopic,
    handleCompletTopic,
    parseNodeTopicToTopic,
  };
}
